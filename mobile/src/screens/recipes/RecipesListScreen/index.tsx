import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CollapsibleSection } from '../../../components/CollapsibleSection';
import {
  DropdownOption,
  DropdownSelect,
} from '../../../components/DropdownSelect';
import { FormInput } from '../../../components/FormInput';
import { SideMenu } from '../../../components/SideMenu';
import { useAuth } from '../../../contexts/AuthContext';
import { AppStackParamList } from '../../../navigation/types';
import { categoriesService } from '../../../services/categories.service';
import { recipesService } from '../../../services/recipes.service';
import { Category, ListRecipesParams, Recipe } from '../../../types/api';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { getCategoryName } from '../../../utils/getCategoryName';
import { styles } from './styles';
import { ChevronIcon } from '../../../components/ChevronIcon';
type Props = NativeStackScreenProps<AppStackParamList, 'RecipesList'>;

type AppliedFilters = {
  search: string;
  categoryId: number | null;
};

export function RecipesListScreen({ navigation }: Props) {
  const { signOut } = useAuth();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchText, setSearchText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    search: '',
    categoryId: null,
  });

  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Minhas receitas',
      headerRight: () => (
        <Pressable
          onPress={() => setMenuVisible(true)}
          style={styles.headerMenuButton}
        >
          <Text style={styles.headerMenuIcon}>☰</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const categoryOptions = useMemo<DropdownOption[]>(() => {
    return [
      {
        label: 'Todas as categorias',
        value: null,
      },
      ...categories.map(category => ({
        label: category.name ?? `Categoria ${category.id}`,
        value: category.id,
      })),
    ];
  }, [categories]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await categoriesService.list();
      setCategories(data);
    } catch (error) {
      Alert.alert('Erro ao carregar categorias', getApiErrorMessage(error));
    }
  }, []);

  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);

      const params: ListRecipesParams = {
        page: 1,
        limit: 20,
      };

      const normalizedSearch = appliedFilters.search.trim();

      if (normalizedSearch) {
        params.search = normalizedSearch;
      }

      if (appliedFilters.categoryId !== null) {
        params.categoryId = appliedFilters.categoryId;
      }

      const data = await recipesService.list(params);
      setRecipes(data);
    } catch (error) {
      Alert.alert('Erro ao carregar receitas', getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [loadRecipes]),
  );

  function handleApplyFilters() {
    setAppliedFilters({
      search: searchText,
      categoryId: selectedCategoryId,
    });
  }

  function handleClearFilters() {
    setSearchText('');
    setSelectedCategoryId(null);
    setAppliedFilters({
      search: '',
      categoryId: null,
    });
  }

  function getRecipeInitial(recipe: Recipe): string {
    return recipe.name?.trim().charAt(0).toUpperCase() || 'R';
  }

  return (
    <View style={styles.container}>
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onCreateRecipe={() => navigation.navigate('RecipeForm')}
        onSignOut={signOut}
      />

      <CollapsibleSection
        title="Pesquisar receitas"
        expanded={filtersExpanded}
        onToggle={() => setFiltersExpanded(previous => !previous)}
      >
        <FormInput
          label="Nome da receita"
          placeholder="Ex: bolo, carne, sopa..."
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />

        <DropdownSelect
          label="Categoria"
          placeholder="Todas as categorias"
          value={selectedCategoryId}
          options={categoryOptions}
          onChange={setSelectedCategoryId}
        />

        <View style={styles.filterActions}>
          <Pressable style={styles.primaryButton} onPress={handleApplyFilters}>
            <Text style={styles.primaryButtonText}>Buscar</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleClearFilters}
          >
            <Text style={styles.secondaryButtonText}>Limpar filtros</Text>
          </Pressable>
        </View>
      </CollapsibleSection>

      <FlatList
        data={recipes}
        keyExtractor={item => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadRecipes} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBox}>
              <Text style={styles.emptyIcon}>♡</Text>
            </View>

            <Text style={styles.emptyTitle}>Nenhuma receita encontrada</Text>

            <Text style={styles.emptyText}>
              Use o menu para cadastrar uma nova receita.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('RecipeDetails', {
                id: item.id,
              })
            }
          >
            <View style={styles.recipeAvatar}>
              <Text style={styles.recipeAvatarText}>
                {getRecipeInitial(item)}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.recipeName}>{item.name ?? 'Sem nome'}</Text>

              <Text style={styles.recipeCategory}>
                {getCategoryName(categories, item.categoryId)}
              </Text>

              <View style={styles.recipeMeta}>
                <Text style={styles.recipeInfo}>
                  {item.preparationTimeMinutes
                    ? `${item.preparationTimeMinutes} min`
                    : 'Tempo não informado'}
                </Text>

                <Text style={styles.recipeDot}>•</Text>

                <Text style={styles.recipeInfo}>
                  {item.servings
                    ? `${item.servings} porções`
                    : 'Porções não informadas'}
                </Text>
              </View>
            </View>

            <View style={styles.cardChevron}>
              <ChevronIcon direction="right" size={13} color="#9aa1ac" />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
