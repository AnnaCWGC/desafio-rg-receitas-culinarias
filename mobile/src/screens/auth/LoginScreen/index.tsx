import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActionButton } from '../../../components/ActionButton';
import { FormInput } from '../../../components/FormInput';
import { useAuth } from '../../../contexts/AuthContext';
import { AuthStackParamList } from '../../../navigation/types';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    try {
      if (!login.trim()) {
        Alert.alert('Validação', 'Informe seu login.');
        return;
      }

      if (!password.trim()) {
        Alert.alert('Validação', 'Informe sua senha.');
        return;
      }

      setSubmitting(true);

      await signIn(login.trim(), password);
    } catch (error) {
      Alert.alert('Erro ao entrar', getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
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
        <View style={styles.brandContainer}>

          <Text style={styles.title}>Receitas Culinárias</Text>

          <Text style={styles.subtitle}>
            Organize suas receitas favoritas em um só lugar.
          </Text>
        </View>

        <View style={styles.card}>
          <FormInput
            label="Login"
            placeholder="Digite seu login"
            autoCapitalize="none"
            value={login}
            onChangeText={setLogin}
          />

          <FormInput
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <ActionButton
            title={submitting ? 'Entrando...' : 'Entrar'}
            disabled={submitting}
            onPress={handleLogin}
          />

          <ActionButton
            title="Criar conta"
            variant="outline"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}