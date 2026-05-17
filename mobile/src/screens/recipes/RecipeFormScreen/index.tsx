import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActionButton } from '../../../components/ActionButton';
import {
  DropdownOption,
  DropdownSelect,
} from '../../../components/DropdownSelect';
import { FormInput } from '../../../components/FormInput';
import { AppStackParamList } from '../../../navigation/types';
import { categoriesService } from '../../../services/categories.service';
import { recipesService } from '../../../services/recipes.service';
import { Category } from '../../../types/api';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'RecipeForm'>;

export function RecipeFormScreen({ route, navigation }: Props) {
  const recipeId = route.params?.id;
  const isEditing = Boolean(recipeId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [preparationTimeMinutes, setPreparationTimeMinutes] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationMode, setPreparationMode] = useState('');

  const [loading, setLoading] = useState(Boolean(recipeId));
  const [submitting, setSubmitting] = useState(false);

  const screenTitle = useMemo(() => {
    return isEditing ? 'Editar receita' : 'Nova receita';
  }, [isEditing]);

  const screenSubtitle = useMemo(() => {
    return isEditing
      ? 'Atualize as informações da receita selecionada.'
      : 'Preencha os dados principais da sua receita.';
  }, [isEditing]);

  const categoryOptions = useMemo<DropdownOption[]>(() => {
    return [
      {
        label: 'Sem categoria',
        value: null,
      },
      ...categories.map(category => ({
        label: category.name ?? `Categoria ${category.id}`,
        value: category.id,
      })),
    ];
  }, [categories]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);

        const categoriesData = await categoriesService.list();
        setCategories(categoriesData);

        if (recipeId) {
          const recipe = await recipesService.findById(recipeId);

          setCategoryId(recipe.categoryId);
          setName(recipe.name ?? '');
          setPreparationTimeMinutes(
            recipe.preparationTimeMinutes
              ? String(recipe.preparationTimeMinutes)
              : '',
          );
          setServings(recipe.servings ? String(recipe.servings) : '');
          setIngredients(recipe.ingredients ?? '');
          setPreparationMode(recipe.preparationMode);
        }
      } catch (error) {
        Alert.alert('Erro ao carregar dados', getApiErrorMessage(error));
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, [navigation, recipeId]);

  function parseOptionalNumber(value: string): number | null {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return null;
    }

    const parsedValue = Number(trimmedValue);

    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
      throw new Error('Informe apenas números positivos.');
    }

    return parsedValue;
  }

  async function handleSubmit() {
    try {
      if (!name.trim()) {
        Alert.alert('Validação', 'Informe o nome da receita.');
        return;
      }

      if (!preparationMode.trim()) {
        Alert.alert('Validação', 'Informe o modo de preparo.');
        return;
      }

      setSubmitting(true);

      const payload = {
        categoryId,
        name: name.trim(),
        preparationTimeMinutes: parseOptionalNumber(preparationTimeMinutes),
        servings: parseOptionalNumber(servings),
        ingredients: ingredients.trim() || null,
        preparationMode: preparationMode.trim(),
      };

      if (recipeId) {
        await recipesService.update(recipeId, payload);
      } else {
        await recipesService.create(payload);
      }

      navigation.goBack();
    } catch (error) {
      if (error instanceof Error && error.message.includes('números')) {
        Alert.alert('Validação', error.message);
        return;
      }

      Alert.alert('Erro ao salvar receita', getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.select({
        ios: 'padding',
        android: undefined,
      })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>{screenTitle}</Text>
          <Text style={styles.subtitle}>{screenSubtitle}</Text>
        </View>

        <View style={styles.card}>
          <FormInput
            label="Nome"
            placeholder="Ex: Bolo de cenoura"
            value={name}
            onChangeText={setName}
          />

          <DropdownSelect
            label="Categoria"
            placeholder="Selecione uma categoria"
            value={categoryId}
            options={categoryOptions}
            onChange={setCategoryId}
          />

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <FormInput
                label="Tempo"
                placeholder="45"
                keyboardType="numeric"
                value={preparationTimeMinutes}
                onChangeText={setPreparationTimeMinutes}
              />
            </View>

            <View style={styles.rowItem}>
              <FormInput
                label="Porções"
                placeholder="8"
                keyboardType="numeric"
                value={servings}
                onChangeText={setServings}
              />
            </View>
          </View>

          <FormInput
            label="Ingredientes"
            placeholder="Informe os ingredientes"
            multiline
            value={ingredients}
            onChangeText={setIngredients}
          />

          <FormInput
            label="Modo de preparo"
            placeholder="Descreva o modo de preparo"
            multiline
            value={preparationMode}
            onChangeText={setPreparationMode}
          />
        </View>

        <ActionButton
          title={submitting ? 'Salvando...' : 'Salvar receita'}
          disabled={submitting}
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}