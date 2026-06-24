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

const isAuthEndpoint = (endpointName?: string) => {
  return endpointName === "sendOtp" || endpointName === "login";
};

const getEndpointName = (action: unknown) => {
  if (typeof action !== "object" || action === null || !("meta" in action)) {
    return undefined;
  }

  const meta = action.meta;
  if (typeof meta !== "object" || meta === null || !("arg" in meta)) {
    return undefined;
  }

  const arg = meta.arg;
  if (typeof arg !== "object" || arg === null || !("endpointName" in arg)) {
    return undefined;
  }

  const endpointName = arg.endpointName;
  return typeof endpointName === "string" ? endpointName : undefined;
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
    const endpointName = getEndpointName(action);
    store.dispatch(setGlobalLoading(false));
    store.dispatch(setGlobalError(getErrorMessage(payload)));

    if (
      isErrorPayload(payload) &&
      payload.status === 401 &&
      !isAuthEndpoint(endpointName)
    ) {
      store.dispatch(clearAuthState());
      removeToken();
      redirectToLogin();
    }
  }

  return next(action);
};
