/// <reference types="vite/client" />

type LocalStorageKeys = 'refreshToken' | 'accessToken';

type LocalStorageKeysObject = {
  [key in LocalStorageKeys]: string;
};
