import { AppError } from '../../shared/errors/AppError';
import { CategoriesRepository } from '../categories/categories.repository';
import { RecipesRepository } from './recipes.repository';
import { RecipesService } from './recipes.service';

function createRecipesRepositoryMock() {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<RecipesRepository>;
}

function createCategoriesRepositoryMock() {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
  } as unknown as jest.Mocked<CategoriesRepository>;
}

const recipeMock = {
  id: 1,
  id_usuarios: 10,
  id_categorias: 1,
  nome: 'Bolo de cenoura',
  tempo_preparo_minutos: 45,
  porcoes: 8,
  modo_preparo: 'Misture os ingredientes e leve ao forno.',
  ingredientes: 'Cenoura; ovos; farinha; açúcar',
  criado_em: new Date('2026-05-16T10:00:00.000Z'),
  alterado_em: new Date('2026-05-16T10:00:00.000Z'),
};

describe('RecipesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listar receitas mapeando os campos do banco para a resposta da API', async () => {
    const recipesRepository = createRecipesRepositoryMock();
    const categoriesRepository = createCategoriesRepositoryMock();

    recipesRepository.findAll.mockResolvedValue([recipeMock]);

    const recipesService = new RecipesService(
      recipesRepository,
      categoriesRepository,
    );

    const result = await recipesService.findAll(10, {
      page: 1,
      limit: 10,
    });

    expect(recipesRepository.findAll).toHaveBeenCalledWith({
      userId: 10,
      search: undefined,
      categoryId: undefined,
      page: 1,
      limit: 10,
    });

    expect(result).toEqual([
      {
        id: 1,
        userId: 10,
        categoryId: 1,
        name: 'Bolo de cenoura',
        preparationTimeMinutes: 45,
        servings: 8,
        preparationMode: 'Misture os ingredientes e leve ao forno.',
        ingredients: 'Cenoura; ovos; farinha; açúcar',
        createdAt: '2026-05-16T10:00:00.000Z',
        updatedAt: '2026-05-16T10:00:00.000Z',
      },
    ]);
  });

  it('criar receita para o usuário autenticado', async () => {
    const recipesRepository = createRecipesRepositoryMock();
    const categoriesRepository = createCategoriesRepositoryMock();

    categoriesRepository.findById.mockResolvedValue({
      id: 1,
      nome: 'Bolos e tortas doces',
    });

    recipesRepository.create.mockResolvedValue(recipeMock);

    const recipesService = new RecipesService(
      recipesRepository,
      categoriesRepository,
    );

    const result = await recipesService.create(10, {
      categoryId: 1,
      name: 'Bolo de cenoura',
      preparationTimeMinutes: 45,
      servings: 8,
      preparationMode: 'Misture os ingredientes e leve ao forno.',
      ingredients: 'Cenoura; ovos; farinha; açúcar',
    });

    expect(categoriesRepository.findById).toHaveBeenCalledWith(1);

    expect(recipesRepository.create).toHaveBeenCalledWith({
      id_usuarios: 10,
      id_categorias: 1,
      nome: 'Bolo de cenoura',
      tempo_preparo_minutos: 45,
      porcoes: 8,
      modo_preparo: 'Misture os ingredientes e leve ao forno.',
      ingredientes: 'Cenoura; ovos; farinha; açúcar',
    });

    expect(result.userId).toBe(10);
    expect(result.categoryId).toBe(1);
    expect(result.name).toBe('Bolo de cenoura');
  });

  it('não criar receita com categoria inexistente', async () => {
    const recipesRepository = createRecipesRepositoryMock();
    const categoriesRepository = createCategoriesRepositoryMock();

    categoriesRepository.findById.mockResolvedValue(undefined);

    const recipesService = new RecipesService(
      recipesRepository,
      categoriesRepository,
    );

    await expect(
      recipesService.create(10, {
        categoryId: 999,
        name: 'Receita inválida',
        preparationTimeMinutes: 30,
        servings: 2,
        preparationMode: 'Modo de preparo qualquer.',
        ingredients: 'Ingrediente qualquer',
      }),
    ).rejects.toMatchObject({
      message: 'Categoria não encontrada.',
      statusCode: 404,
    });

    expect(recipesRepository.create).not.toHaveBeenCalled();
  });

  it('não buscar receita de outro usuário', async () => {
    const recipesRepository = createRecipesRepositoryMock();
    const categoriesRepository = createCategoriesRepositoryMock();

    recipesRepository.findById.mockResolvedValue(undefined);

    const recipesService = new RecipesService(
      recipesRepository,
      categoriesRepository,
    );

    await expect(recipesService.findById(1, 10)).rejects.toMatchObject({
      message: 'Receita não encontrada.',
      statusCode: 404,
    });

    expect(recipesRepository.findById).toHaveBeenCalledWith(1, 10);
  });

  it('exclui receitar do usuário autenticado', async () => {
    const recipesRepository = createRecipesRepositoryMock();
    const categoriesRepository = createCategoriesRepositoryMock();

    recipesRepository.delete.mockResolvedValue(1);

    const recipesService = new RecipesService(
      recipesRepository,
      categoriesRepository,
    );

    await recipesService.delete(1, 10);

    expect(recipesRepository.delete).toHaveBeenCalledWith(1, 10);
  });

  it('não excluir receita inexistente', async () => {
    const recipesRepository = createRecipesRepositoryMock();
    const categoriesRepository = createCategoriesRepositoryMock();

    recipesRepository.delete.mockResolvedValue(0);

    const recipesService = new RecipesService(
      recipesRepository,
      categoriesRepository,
    );

    await expect(recipesService.delete(1, 10)).rejects.toBeInstanceOf(AppError);

    await expect(recipesService.delete(1, 10)).rejects.toMatchObject({
      message: 'Receita não encontrada.',
      statusCode: 404,
    });
  });
});
