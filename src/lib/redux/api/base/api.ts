import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { getToken, isTokenExpired, redirectToLogin, removeToken } from "../../../auth";
import { clearAuthState } from "../../slices/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const getRequestUrl = (args: string | FetchArgs) => {
  return typeof args === "string" ? args : args.url;
};

const isPublicAuthEndpoint = (args: string | FetchArgs) => {
  return getRequestUrl(args).startsWith("auth/");
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    if (endpoint === "sendOtp" || endpoint === "login") {
      return headers;
    }

    const token = getToken();

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const createAuthError = (): FetchBaseQueryError => ({
  status: 401,
  data: { message: "Session expired" },
});

const handleExpiredSession = (dispatch: (action: ReturnType<typeof clearAuthState>) => void) => {
  dispatch(clearAuthState());
  removeToken();
  redirectToLogin();
};

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const isPublicAuth = isPublicAuthEndpoint(args);

  if (!isPublicAuth && isTokenExpired()) {
    handleExpiredSession(api.dispatch);
    return { error: createAuthError() };
  }

  const result = await rawBaseQuery(args, api, extraOptions);

  if (!isPublicAuth && result.error?.status === 401) {
    handleExpiredSession(api.dispatch);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Location", "User", "Collection"],
  endpoints: () => ({}),
});
