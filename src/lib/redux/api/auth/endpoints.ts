import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import {
  transformLoginRequest,
  transformSendOtpRequest,
} from "./transforms/authRequestTransform";
import {
  transformLoginResponse,
  transformSendOtpResponse,
} from "./transforms/authResponseTransform";
import type { LoginRequest, SendOtpRequest } from "./types/requests";
import type { LoginResponse, SendOtpResponse } from "./types/responses";

type Builder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  "Location" | "User" | "Collection",
  "api"
>;

export const authEndpoints = (builder: Builder) => ({
  sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
    query: (body) => ({
      url: "auth/send-otp",
      method: "POST",
      body: transformSendOtpRequest(body),
    }),
    transformResponse: transformSendOtpResponse,
  }),
  login: builder.mutation<LoginResponse, LoginRequest>({
    query: (body) => ({
      url: "auth/login",
      method: "POST",
      body: transformLoginRequest(body),
    }),
    transformResponse: transformLoginResponse,
  }),
});
