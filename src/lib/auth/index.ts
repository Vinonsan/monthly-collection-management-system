import {
  AUTH_EXPIRES_AT_STORAGE_KEY,
  AUTH_TOKEN_STORAGE_KEY,
  LOGIN_ROUTE,
} from "./constants";

export interface SaveTokenOptions {
  expiresAt?: number | string | Date;
}

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

const normalizeExpiry = (expiresAt?: number | string | Date): string | null => {
  if (!expiresAt) {
    return null;
  }

  if (expiresAt instanceof Date) {
    return String(expiresAt.getTime());
  }

  if (typeof expiresAt === "number") {
    return String(expiresAt);
  }

  const parsedDate = Date.parse(expiresAt);
  return Number.isNaN(parsedDate) ? expiresAt : String(parsedDate);
};

export const saveToken = (token: string, options?: SaveTokenOptions) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);

  const expiry = normalizeExpiry(options?.expiresAt);
  if (expiry) {
    window.localStorage.setItem(AUTH_EXPIRES_AT_STORAGE_KEY, expiry);
  }
};

export const getToken = () => {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
};

export const getTokenExpiry = () => {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(AUTH_EXPIRES_AT_STORAGE_KEY);
};

export const removeToken = () => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(AUTH_EXPIRES_AT_STORAGE_KEY);
};

export const isTokenExpired = (expiresAt = getTokenExpiry()) => {
  if (!expiresAt) {
    return false;
  }

  const expiryTime = Number(expiresAt);
  if (Number.isNaN(expiryTime)) {
    return true;
  }

  return Date.now() >= expiryTime;
};

export const redirectToLogin = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname !== LOGIN_ROUTE) {
    window.location.assign(LOGIN_ROUTE);
  }
};
