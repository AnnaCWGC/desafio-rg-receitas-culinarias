import React, { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
      setSubmitting(true);

      await signIn(login, password);
    } catch (error) {
      Alert.alert('Erro ao entrar', getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: 'padding',
        android: undefined,
      })}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Receitas Culinárias</Text>

        <TextInput
          style={styles.input}
          placeholder="Login"
          autoCapitalize="none"
          value={login}
          onChangeText={setLogin}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title={submitting ? 'Entrando...' : 'Entrar'}
          onPress={handleLogin}
          disabled={submitting}
        />

        <View style={styles.secondaryButton}>
          <Button
            title="Criar conta"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}