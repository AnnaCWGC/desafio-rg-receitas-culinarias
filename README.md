# Vaga de Desenvolvedor / Tech Lead

## Objetivo

O desafio consiste em implementar o máximo de funcionalidades descritas abaixo e enviar o projeto dentro do prazo estabelecido pela empresa.

## Funcionalidades

* Cadastro de usuário no sistema.
* Login de usuário.
* Logoff de usuário.
* Cadastro de receitas pelo usuário.
* Pesquisa de receitas cadastradas pelo usuário.
* Edição de uma receita.
* Exclusão de uma receita.
* Impressão de uma receita.

## Banco de Dados

Nos arquivos enviados, há uma pasta chamada **banco**, que contém detalhes sobre a modelagem do banco de dados e scripts SQL para sua criação.

## Restrições

### Desenvolvedor Web - Full Stack / Tech Lead

* Utilize **Node.js** com **TypeScript** para construir uma **API RESTful** no backend.
* No frontend, utilize **Vue.js** para criar a interface que se comunicará com o backend.
* O banco de dados deve ser **MySQL**.
* Inclua um **guia detalhado** explicando como rodar o sistema.
* **Diferenciais:** Documentação de API (**Swagger**), uso de **Docker** e implementação de **testes unitários e de integração (E2E)**.  
  _Para nível **Tech Lead**, esses itens são obrigatórios._

### Desenvolvedor Mobile

* Utilize **React Native** para desenvolver o aplicativo.
* O banco de dados pode ser qualquer solução, desde que os dados sejam **persistidos e recuperáveis** em um novo login.
* A criação de uma nova conta pode ser realizada localmente, armazenando os dados para login posterior.
* **Não é necessário implementar a funcionalidade de impressão** no app mobile.
* **Não é obrigatório desenvolver um backend**, mas isso será considerado um diferencial.
* Gere um **APK funcional** para Android e envie-o junto com o código-fonte.



MINHAS ADIÇÕES:::




Guia de execução rápida (Passo a passo pedido no e-mail):::

Para facilitar a primeira execução do projeto, criei um script de inicialização na raiz.

Esse script:
- verifica se o Docker está rodando;
- cria `backend/.env` a partir de `backend/.env.example`, caso ainda não exista;
- sobe os containers do MySQL e do backend;
- espera o MySQL ficar saudável;
- executa as migrations;
- executa a seed inicial das categorias;
- testa o endpoint `/health`.




Primeira execução:::

Na raiz do projeto, rode:
npm run project:init


Ao final, a API ficará disponível em:
http://localhost:3333


A documentação Swagger ficará disponível em:
http://localhost:3333/api-docs


O health check pode ser acessado em:
http://localhost:3333/health





Reset completo do ambiente:::

Caso queira apagar o volume do banco e recriar tudo do zero, rode:
npm run project:reset

Atenção: esse comando VAI remover os dados salvos no banco.





Rodando o aplicativo mobile:::

Depois que o backend estiver rodando, entre na pasta do mobile:
cd mobile

Instale as dependências:
npm install

Inicie o Metro:
npm start

Em outro terminal, rode o app Android:
npm run android


URL da API no mobile

A URL da API fica em:
mobile/src/config/environment.ts

Para Android Emulator, use:
export const API_BASE_URL = 'http://10.0.2.2:3333';

Para celular físico, use o IP da máquina onde o backend está rodando.
Exemplo:
export const API_BASE_URL = 'http://192.168.0.10:3333';




Observações sobre o projeto:
--- Escolhi utilizar express ao inves de nest para maior facilidade de execução devido ao tempo para o projeto;