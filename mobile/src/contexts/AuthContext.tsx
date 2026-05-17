import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authService } from '../services/auth.service';
import { tokenStorage } from '../storage/tokenStorage';
import { User } from '../types/api';

type AuthContextData = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (login: string, password: string) => Promise<void>;
  signUp: (name: string, login: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredToken() {
      const token = await tokenStorage.getToken();

      setIsAuthenticated(Boolean(token));
      setLoading(false);
    }

    loadStoredToken();
  }, []);

  const signIn = useCallback(async (login: string, password: string) => {
    const response = await authService.login({
      login,
      password,
    });

    await tokenStorage.setToken(response.token);

    setUser(response.user);
    setIsAuthenticated(true);
  }, []);

  const signUp = useCallback(
    async (name: string, login: string, password: string) => {
      await authService.register({
        name,
        login,
        password,
      });

      await signIn(login, password);
    },
    [signIn],
  );

  const signOut = useCallback(async () => {
    await tokenStorage.removeToken();

    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
    }),
    [user, loading, isAuthenticated, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}