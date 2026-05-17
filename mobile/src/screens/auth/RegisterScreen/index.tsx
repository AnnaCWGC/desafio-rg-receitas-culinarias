import React, { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '../../../contexts/AuthContext';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { styles } from './styles';

export function RegisterScreen() {
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleRegister() {
    try {
      setSubmitting(true);

      await signUp(name, login, password);
    } catch (error) {
      Alert.alert('Erro ao cadastrar', getApiErrorMessage(error));
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
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

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
          title={submitting ? 'Cadastrando...' : 'Cadastrar'}
          onPress={handleRegister}
          disabled={submitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
}