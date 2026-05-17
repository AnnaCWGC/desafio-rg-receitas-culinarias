import { createAsyncStorage } from '@react-native-async-storage/async-storage';

const storage = createAsyncStorage('rg_receitas_storage');

const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  async getToken(): Promise<string | null> {
    return storage.getItem(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await storage.setItem(TOKEN_KEY, token);
  },

  async removeToken(): Promise<void> {
    await storage.removeItem(TOKEN_KEY);
  },
};