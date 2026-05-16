import { database } from '../../shared/database/connection';

export type Recipe = {
  id: number;
  id_usuarios: number;
  id_categorias: number | null;
  nome: string | null;
  tempo_preparo_minutos: number | null;
  porcoes: number | null;
  modo_preparo: string;
  ingredientes: string | null;
  criado_em: Date | string;
  alterado_em: Date | string;
};

type FindAllInput = {
  userId: number;
  search?: string;
  categoryId?: number | null;
  page: number;
  limit: number;
};

type CreateRecipeInput = {
  id_usuarios: number;
  id_categorias: number | null;
  nome: string;
  tempo_preparo_minutos: number | null;
  porcoes: number | null;
  modo_preparo: string;
  ingredientes: string | null;
};

type UpdateRecipeInput = Partial<{
  id_categorias: number | null;
  nome: string;
  tempo_preparo_minutos: number | null;
  porcoes: number | null;
  modo_preparo: string;
  ingredientes: string | null;
}>;

export class RecipesRepository {
  async findAll(input: FindAllInput): Promise<Recipe[]> {
    const offset = (input.page - 1) * input.limit;

    const query = database<Recipe>('receitas')
      .where('id_usuarios', input.userId)
      .orderBy('criado_em', 'desc')
      .limit(input.limit)
      .offset(offset);

    if (input.search) {
      query.andWhere('nome', 'like', `%${input.search}%`);
    }

    if (input.categoryId) {
      query.andWhere('id_categorias', input.categoryId);
    }

    return query.select('*');
  }

  async findById(id: number, userId: number): Promise<Recipe | undefined> {
    return database<Recipe>('receitas')
      .where({
        id,
        id_usuarios: userId,
      })
      .first();
  }

  async create(data: CreateRecipeInput): Promise<Recipe> {
    const now = new Date();

    const [id] = await database('receitas').insert({
      ...data,
      criado_em: now,
      alterado_em: now,
    });

    const recipe = await this.findById(id, data.id_usuarios);

    if (!recipe) {
      throw new Error('Receita não encontrada após criação.');
    }

    return recipe;
  }

  async update(
    id: number,
    userId: number,
    data: UpdateRecipeInput,
  ): Promise<Recipe | undefined> {
    await database('receitas')
      .where({
        id,
        id_usuarios: userId,
      })
      .update({
        ...data,
        alterado_em: new Date(),
      });

    return this.findById(id, userId);
  }

  async delete(id: number, userId: number): Promise<number> {
    return database('receitas')
      .where({
        id,
        id_usuarios: userId,
      })
      .delete();
  }
}