import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  clearAccessToken,
  setAccessToken,
} from './authToken';

import {
  getMe,
  login as loginRequest,
  logout as logoutRequest,
  refresh,
  type AuthenticatedUser,
  type LoginRequest,
} from './authService';

type AuthContextValue = {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthenticatedUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const refreshResponse = await refresh();

        setAccessToken(refreshResponse.accessToken);

        const authenticatedUser = await getMe();

        setUser(authenticatedUser);
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  async function login(data: LoginRequest) {
    const response = await loginRequest(data);

    setAccessToken(response.accessToken);
    setUser(response.usuario);
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de AuthProvider.',
    );
  }

  return context;
}