import {
  isFulfilled,
  isPending,
  isRejectedWithValue,
  type Middleware,
} from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { redirectToLogin, removeToken } from "../../auth";
import { clearAuthState } from "../slices/auth";
import { setGlobalError, setGlobalLoading } from "../slices/common";

interface ErrorPayload {
  data?: {
    message?: string;
    error?: string;
  };
  status?: FetchBaseQueryError["status"];
}

const isErrorPayload = (payload: unknown): payload is ErrorPayload => {
  return typeof payload === "object" && payload !== null;
};

const getErrorMessage = (payload: unknown) => {
  if (!isErrorPayload(payload)) {
    return "Something went wrong";
  }

  return payload.data?.message ?? payload.data?.error ?? "Something went wrong";
};

export const apiMiddleware: Middleware = (store) => (next) => (action) => {
  if (isPending(action)) {
    store.dispatch(setGlobalLoading(true));
  }

  if (isFulfilled(action)) {
    store.dispatch(setGlobalLoading(false));
  }

  if (isRejectedWithValue(action)) {
    const payload = action.payload;
    store.dispatch(setGlobalLoading(false));
    store.dispatch(setGlobalError(getErrorMessage(payload)));

    if (isErrorPayload(payload) && payload.status === 401) {
      store.dispatch(clearAuthState());
      removeToken();
      redirectToLogin();
    }
  }

  return next(action);
};
