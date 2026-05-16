Leitura inicial do modelo de dados

O desafio me fornece um modelo relacional com três entidades principais:

- usuarios
- categorias
- receitas




-> usuarios

Representam os usuários do sistema.

Campos principais:

- id
- nome
- login
- senha
- criado_em
- alterado_em



-> categorias

Representa as categorias das receitas.

Essa tabela `categorias` já é pré-povoada.



-> receitas

Representa as receitas cadastradas no sistema.

Campos principais:

- id
- id_usuarios
- id_categorias
- nome
- tempo_preparo_minutos
- porcoes
- modo_preparo
- ingredientes
- criado_em
- alterado_em





Regras de negócio, arquiteturais e de modelagem iniciais:

- Uma receita pertence a um usuário (1 pra 1).
- O frontend não deve enviar `id_usuarios` livremente.
- O backend deve identificar o usuário da receita a partir da autenticação.
- Categorias serão carregadas a partir da seed inicial.
- O campo `ingredientes` será mantido como texto para respeitar o modelo original do desafio.
- Senhas tem armazenadas com hash.
- Não será exposto endpoint de exclusão de categorias, pois categorias são dados de referência.




Arquitetura do desafio

Escolhi organizar como um monorepo contendo backend, mobile, banco e documentação.

Estrutura planejada (tenho que lembrar de atualizar )

desafio_rg_receitas_culinarias/
  banco/
  backend/
  mobile/
  docs/
  docker-compose.yml
  README.md