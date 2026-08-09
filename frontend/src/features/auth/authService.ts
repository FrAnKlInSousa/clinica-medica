import { api } from '../../services/api';

export type UserRole =
  | 'ADMIN'
  | 'RECEPCIONISTA'
  | 'MEDICO';

export type AuthenticatedUser = {
  id: number;
  nome: string;
  email: string;
  perfil: UserRole;
  ativo: boolean;
};

export type LoginRequest = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  usuario: AuthenticatedUser;
};

export type RefreshResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export async function login(
  request: LoginRequest,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    '/auth/login',
    request,
  );

  return response.data;
}

export async function refresh(): Promise<RefreshResponse> {
  const response =
    await api.post<RefreshResponse>('/auth/refresh');

  return response.data;
}

export async function getMe(): Promise<AuthenticatedUser> {
  const response =
    await api.get<AuthenticatedUser>('/auth/me');

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}