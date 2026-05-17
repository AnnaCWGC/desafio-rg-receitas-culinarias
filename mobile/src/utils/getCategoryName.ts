import { Category } from '../types/api';

export function getCategoryName(
  categories: Category[],
  categoryId: number | null,
): string {
  if (categoryId === null) {
    return 'Sem categoria';
  }

  const category = categories.find(item => item.id === categoryId);

  return category?.name ?? `Categoria ${categoryId}`;
}