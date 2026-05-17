import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from '../../../navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'RecipeDetails'>;

export function RecipeDetailsScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhe da receita</Text>

      <Text>ID da receita: {route.params.id}</Text>

      <Text style={styles.description}>
        A tela de detalhe será implementada no próximo passo.
      </Text>
    </View>
  );
}