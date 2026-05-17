import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActionButton } from '../../../components/ActionButton';
import { AppStackParamList } from '../../../navigation/types';
import { categoriesService } from '../../../services/categories.service';
import { recipesService } from '../../../services/recipes.service';
import { Category, Recipe } from '../../../types/api';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { getCategoryName } from '../../../utils/getCategoryName';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'RecipeDetails'>;

export function RecipeDetailsScreen({ route, navigation }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const categoryName = useMemo(() => {
    if (!recipe) {
      return 'Não informada';
    }

    return getCategoryName(categories, recipe.categoryId);
  }, [categories, recipe]);

  const loadRecipe = useCallback(async () => {
    try {
      setLoading(true);

      const [recipeData, categoriesData] = await Promise.all([
        recipesService.findById(route.params.id),
        categoriesService.list(),
      ]);

      setRecipe(recipeData);
      setCategories(categoriesData);
    } catch (error) {
      Alert.alert('Erro ao carregar receita', getApiErrorMessage(error));
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [navigation, route.params.id]);

  useFocusEffect(
    useCallback(() => {
      loadRecipe();
    }, [loadRecipe]),
  );

  function handleEdit() {
    if (!recipe) {
      return;
    }

    navigation.navigate('RecipeForm', {
      id: recipe.id,
    });
  }

  async function confirmDelete() {
    if (!recipe) {
      return;
    }

    try {
      setDeleting(true);

      await recipesService.remove(recipe.id);

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao excluir receita', getApiErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  }

  function handleDelete() {
    Alert.alert(
      'Excluir receita',
      'Tem certeza que deseja excluir esta receita?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ],
    );
  }

  if (loading && !recipe) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Categoria: {categoryName}
        </Text>

        <Text style={styles.infoText}>
          Tempo de preparo:{' '}
          {recipe.preparationTimeMinutes
            ? `${recipe.preparationTimeMinutes} minutos`
            : 'Não informado'}
        </Text>

        <Text style={styles.infoText}>
          Porções: {recipe.servings ?? 'Não informado'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Ingredientes</Text>
      <Text style={styles.contentText}>
        {recipe.ingredients || 'Ingredientes não informados.'}
      </Text>

      <Text style={styles.sectionTitle}>Modo de preparo</Text>
      <Text style={styles.contentText}>{recipe.preparationMode}</Text>

      <View style={styles.actions}>
        <ActionButton title="Editar" onPress={handleEdit} />

        <ActionButton
          title={deleting ? 'Excluindo...' : 'Excluir'}
          variant="danger"
          disabled={deleting}
          onPress={handleDelete}
        />
      </View>
    </ScrollView>
  );
}