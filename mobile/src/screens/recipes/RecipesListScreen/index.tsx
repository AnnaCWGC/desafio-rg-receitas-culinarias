import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../../../contexts/AuthContext';
import { AppStackParamList } from '../../../navigation/types';
import { recipesService } from '../../../services/recipes.service';
import { Recipe } from '../../../types/api';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'RecipesList'>;

export function RecipesListScreen({ navigation }: Props) {
  const { signOut } = useAuth();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadRecipes() {
    try {
      setLoading(true);

      const data = await recipesService.list({
        page: 1,
        limit: 20,
      });

      setRecipes(data);
    } catch (error) {
      Alert.alert('Erro ao carregar receitas', getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Button
          title="Nova receita"
          onPress={() => navigation.navigate('RecipeForm')}
        />

        <Button title="Sair" onPress={signOut} />
      </View>

      <FlatList
        data={recipes}
        keyExtractor={item => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadRecipes} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma receita cadastrada até o momento.
          </Text>
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
            <Text style={styles.recipeName}>{item.name ?? 'Sem nome'}</Text>

            <Text style={styles.recipeInfo}>
              {item.preparationTimeMinutes
                ? `${item.preparationTimeMinutes} min`
                : 'Tempo não informado'}
            </Text>

            <Text style={styles.recipeInfo}>
              {item.servings
                ? `${item.servings} porções`
                : 'Porções não informadas'}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}