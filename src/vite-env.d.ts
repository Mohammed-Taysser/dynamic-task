/// <reference types="vite/client" />

type LocalStorageKeys = 'refreshToken' | 'accessToken';

type LocalStorageKeysObject = {
  [key in LocalStorageKeys]: string;
};

interface LoginResponse {
  refresh: string;
  access: string;
  first_name: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
  is_staff: boolean;
}

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface LoginBodyState {
  email: string;
  password: string;
}

interface RequestState<T = null> {
  data: T;
  status: RequestStatus;
  error: SerializedError;
}
