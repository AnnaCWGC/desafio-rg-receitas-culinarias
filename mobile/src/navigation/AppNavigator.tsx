import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RecipesListScreen } from '../screens/recipes/RecipesListScreen';
import { RecipeDetailsScreen } from '../screens/recipes/RecipeDetailsScreen';
import { RecipeFormScreen } from '../screens/recipes/RecipeFormScreen';
import { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecipesList"
        component={RecipesListScreen}
        options={{
          title: 'Minhas receitas',
        }}
      />

      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{
          title: 'Detalhe da receita',
        }}
      />

      <Stack.Screen
        name="RecipeForm"
        component={RecipeFormScreen}
        options={{
          title: 'Receita',
        }}
      />
    </Stack.Navigator>
  );
}