import axios from 'axios';

import { env } from '../config/env';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '../features/auth/authToken';

type RefreshResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const response =
          await refreshClient.post<RefreshResponse>('/auth/refresh');

        setAccessToken(response.data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${response.data.accessToken}`;

        return api(originalRequest);
      } catch {
        clearAccessToken();
      }
    }

    return Promise.reject(error);
  },
);