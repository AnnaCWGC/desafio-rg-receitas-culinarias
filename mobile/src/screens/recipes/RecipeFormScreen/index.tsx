import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function RecipeFormScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário de receita</Text>

      <Text>
        A FAZER
      </Text>
    </View>
  );
}