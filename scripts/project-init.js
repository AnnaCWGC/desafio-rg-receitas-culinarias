const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const backendEnvExamplePath = path.join(rootDir, 'backend', '.env.example');
const backendEnvPath = path.join(rootDir, 'backend', '.env');

const shouldReset = process.argv.includes('--reset');

function log(message) {
  console.log(`\n> ${message}`);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: false,
    ...options,
  });

  if (result.status !== 0) {
    throw new Error(`Comando falhou: ${command} ${args.join(' ')}`);
  }
}

function runCapture(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    encoding: 'utf-8',
    shell: false,
  });

  if (result.status !== 0) {
    return '';
  }

  return result.stdout.trim();
}

function ensureBackendEnv() {
  if (!fs.existsSync(backendEnvExamplePath)) {
    throw new Error('Arquivo backend/.env.example não encontrado.');
  }

  if (fs.existsSync(backendEnvPath)) {
    console.log('backend/.env já existe. Mantendo arquivo atual.');
    return;
  }

  fs.copyFileSync(backendEnvExamplePath, backendEnvPath);
  console.log('backend/.env criado a partir de backend/.env.example.');
}

function checkDocker() {
  const result = spawnSync('docker', ['info'], {
    cwd: rootDir,
    stdio: 'ignore',
    shell: false,
  });

  if (result.status !== 0) {
    throw new Error(
      'Docker não está rodando. Abra o Docker Desktop e tente novamente.',
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForMysqlHealthy() {
  const maxAttempts = 40;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const status = runCapture('docker', [
      'inspect',
      '--format={{.State.Health.Status}}',
      'rg_receitas_mysql',
    ]);

    if (status === 'healthy') {
      console.log('MySQL está saudável.');
      return;
    }

    console.log(`Aguardando MySQL ficar saudável... (${attempt}/${maxAttempts})`);
    await sleep(3000);
  }

  throw new Error('MySQL não ficou saudável dentro do tempo esperado.');
}

async function waitForApiHealth() {
  const maxAttempts = 30;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const isHealthy = await new Promise(resolve => {
      const request = http.get('http://localhost:3333/health', response => {
        response.resume();
        resolve(response.statusCode === 200);
      });

      request.on('error', () => {
        resolve(false);
      });

      request.setTimeout(2000, () => {
        request.destroy();
        resolve(false);
      });
    });

    if (isHealthy) {
      console.log('API respondeu em http://localhost:3333/health.');
      return;
    }

    console.log(`Aguardando API responder... (${attempt}/${maxAttempts})`);
    await sleep(2000);
  }

  throw new Error('API não respondeu dentro do tempo esperado.');
}

async function main() {
  try {
    log('Iniciando configuração do projeto');

    checkDocker();
    ensureBackendEnv();

    if (shouldReset) {
      log('Resetando containers e volume do banco');
      run('docker', ['compose', 'down', '-v']);
    }

    log('Subindo MySQL e backend com Docker');
    run('docker', ['compose', 'up', '-d', '--build']);

    log('Aguardando banco de dados');
    await waitForMysqlHealthy();

    log('Executando migrations');
    run('docker', ['compose', 'exec', '-T', 'backend', 'npm', 'run', 'migrate']);

    log('Executando seed inicial de categorias');
    run('docker', ['compose', 'exec', '-T', 'backend', 'npm', 'run', 'seed']);

    log('Verificando status da API');
    await waitForApiHealth();

    log('Projeto configurado com sucesso');

    console.log(`
Serviços disponíveis:

API:
http://localhost:3333

Swagger:
http://localhost:3333/api-docs

Health check:
http://localhost:3333/health

Para rodar o app mobile:

cd mobile
npm install
npm start

Em outro terminal:

cd mobile
npm run android
`);
  } catch (error) {
    console.error('\nErro ao configurar o projeto:');
    console.error(error.message);
    process.exit(1);
  }
}

main();
