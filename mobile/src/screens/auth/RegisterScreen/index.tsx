import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { ActionButton } from '../../../components/ActionButton';
import { FormInput } from '../../../components/FormInput';
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
      if (!name.trim()) {
        Alert.alert('Validação', 'Informe seu nome.');
        return;
      }

      if (!login.trim()) {
        Alert.alert('Validação', 'Informe um login.');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Validação', 'A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      setSubmitting(true);

      await signUp(name.trim(), login.trim(), password);
    } catch (error) {
      Alert.alert('Erro ao cadastrar', getApiErrorMessage(error));
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
        <View style={styles.header}>
          <Text style={styles.title}>Crie sua conta</Text>

          <Text style={styles.subtitle}>
            Cadastre-se para salvar e consultar suas receitas.
          </Text>
        </View>

        <View style={styles.card}>
          <FormInput
            label="Nome"
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />

          <FormInput
            label="Login"
            placeholder="Escolha um login"
            autoCapitalize="none"
            value={login}
            onChangeText={setLogin}
          />

          <FormInput
            label="Senha"
            placeholder="Crie uma senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <ActionButton
            title={submitting ? 'Cadastrando...' : 'Cadastrar'}
            disabled={submitting}
            onPress={handleRegister}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}