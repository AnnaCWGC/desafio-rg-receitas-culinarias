export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Desafio RG Receitas Culinárias API',
    version: '1.0.0',
    description:
      'API REST para cadastro e gerenciamento de receitas culinárias.',
  },
  servers: [
    {
      url: 'http://localhost:3333',
      description: 'Ambiente local',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'Verificação de status da API',
    },
    {
      name: 'Auth',
      description: 'Cadastro e autenticação de usuários',
    },
    {
      name: 'Categories',
      description: 'Categorias pré-povoadas de receitas',
    },
    {
      name: 'Recipes',
      description: 'Gerenciamento de receitas do usuário autenticado',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Mensagem de erro.',
          },
        },
      },
      ValidationErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Erro de validação.',
          },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  example: ['password'],
                },
                message: {
                  type: 'string',
                  example: 'String must contain at least 6 character(s)',
                },
              },
            },
          },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'login', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'Anna',
          },
          login: {
            type: 'string',
            example: 'anna',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['login', 'password'],
        properties: {
          login: {
            type: 'string',
            example: 'anna',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
      },
      UserResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Anna',
          },
          login: {
            type: 'string',
            example: 'anna',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/UserResponse',
          },
          token: {
            type: 'string',
            example: 'jwt.token.aqui',
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Bolos e tortas doces',
          },
        },
      },
      Recipe: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          userId: {
            type: 'integer',
            example: 1,
          },
          categoryId: {
            type: 'integer',
            nullable: true,
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Bolo de cenoura',
          },
          preparationTimeMinutes: {
            type: 'integer',
            nullable: true,
            example: 45,
          },
          servings: {
            type: 'integer',
            nullable: true,
            example: 8,
          },
          preparationMode: {
            type: 'string',
            example:
              'Bata os ingredientes no liquidificador, misture com a farinha e leve ao forno.',
          },
          ingredients: {
            type: 'string',
            nullable: true,
            example:
              '3 cenouras; 2 ovos; 2 xícaras de farinha; 1 xícara de açúcar',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-05-16T15:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-05-16T15:00:00.000Z',
          },
        },
      },
      CreateRecipeRequest: {
        type: 'object',
        required: ['name', 'preparationMode'],
        properties: {
          categoryId: {
            type: 'integer',
            nullable: true,
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Bolo de cenoura',
          },
          preparationTimeMinutes: {
            type: 'integer',
            nullable: true,
            example: 45,
          },
          servings: {
            type: 'integer',
            nullable: true,
            example: 8,
          },
          preparationMode: {
            type: 'string',
            example:
              'Bata os ingredientes no liquidificador, misture com a farinha e leve ao forno.',
          },
          ingredients: {
            type: 'string',
            nullable: true,
            example:
              '3 cenouras; 2 ovos; 2 xícaras de farinha; 1 xícara de açúcar',
          },
        },
      },
      UpdateRecipeRequest: {
        type: 'object',
        properties: {
          categoryId: {
            type: 'integer',
            nullable: true,
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Bolo de cenoura com cobertura',
          },
          preparationTimeMinutes: {
            type: 'integer',
            nullable: true,
            example: 50,
          },
          servings: {
            type: 'integer',
            nullable: true,
            example: 10,
          },
          preparationMode: {
            type: 'string',
            example:
              'Bata os ingredientes, misture a farinha, asse e finalize com cobertura.',
          },
          ingredients: {
            type: 'string',
            nullable: true,
            example:
              '3 cenouras; 2 ovos; farinha; açúcar; chocolate para cobertura',
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verifica se a API está ativa',
        responses: {
          200: {
            description: 'API ativa',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Cadastra um novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Usuário cadastrado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserResponse',
                },
              },
            },
          },
          400: {
            description: 'Erro de validação',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationErrorResponse',
                },
              },
            },
          },
          409: {
            description: 'Login já cadastrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Autentica um usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login realizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse',
                },
              },
            },
          },
          400: {
            description: 'Erro de validação',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationErrorResponse',
                },
              },
            },
          },
          401: {
            description: 'Credenciais inválidas',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Lista as categorias de receitas',
        responses: {
          200: {
            description: 'Lista de categorias',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Category',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/recipes': {
      get: {
        tags: ['Recipes'],
        summary: 'Lista as receitas do usuário autenticado',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'search',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
            example: 'bolo',
          },
          {
            name: 'categoryId',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
            },
            example: 1,
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: 1,
            },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: 10,
            },
          },
        ],
        responses: {
          200: {
            description: 'Lista de receitas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Recipe',
                  },
                },
              },
            },
          },
          401: {
            description: 'Usuário não autenticado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Recipes'],
        summary: 'Cria uma nova receita',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateRecipeRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Receita criada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Recipe',
                },
              },
            },
          },
          400: {
            description: 'Erro de validação',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationErrorResponse',
                },
              },
            },
          },
          401: {
            description: 'Usuário não autenticado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          404: {
            description: 'Categoria não encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/recipes/{id}': {
      get: {
        tags: ['Recipes'],
        summary: 'Busca uma receita por ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
            example: 1,
          },
        ],
        responses: {
          200: {
            description: 'Receita encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Recipe',
                },
              },
            },
          },
          401: {
            description: 'Usuário não autenticado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          404: {
            description: 'Receita não encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Recipes'],
        summary: 'Atualiza uma receita',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
            example: 1,
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateRecipeRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Receita atualizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Recipe',
                },
              },
            },
          },
          400: {
            description: 'Erro de validação',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationErrorResponse',
                },
              },
            },
          },
          401: {
            description: 'Usuário não autenticado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          404: {
            description: 'Receita ou categoria não encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Recipes'],
        summary: 'Remove uma receita',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
            example: 1,
          },
        ],
        responses: {
          204: {
            description: 'Receita removida com sucesso',
          },
          401: {
            description: 'Usuário não autenticado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          404: {
            description: 'Receita não encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
};