import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { buildQueryUrl } from "../_utils/queryParams";
import {
  transformCreateUserRequest,
  transformUpdateUserRequest,
} from "./transforms/userRequestTransform";
import {
  transformDeleteUserResponse,
  transformUserListResponse,
  transformUserResponse,
} from "./transforms/userResponseTransform";
import type {
  CreateUserRequest,
  DeleteUserRequest,
  UpdateUserRequest,
  UserListRequest,
} from "./types/requests";
import type {
  DeleteUserResponse,
  UserListResponse,
  UserResponse,
} from "./types/responses";

type Builder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  "Location" | "User" | "Collection",
  "api"
>;

export const userEndpoints = (builder: Builder) => ({
  getUsers: builder.query<UserListResponse, UserListRequest | void>({
    query: (params) => buildQueryUrl(params ?? {}, "users"),
    transformResponse: transformUserListResponse,
    providesTags: (result) =>
      result
        ? [
            ...result.data.map((user) => ({
              type: "User" as const,
              id: user.id,
            })),
            { type: "User" as const, id: "LIST" },
          ]
        : [{ type: "User" as const, id: "LIST" }],
  }),
  getUserById: builder.query<UserResponse, string>({
    query: (id) => `users/${encodeURIComponent(id)}`,
    transformResponse: transformUserResponse,
    providesTags: (_result, _error, id) => [{ type: "User", id }],
  }),
  createUser: builder.mutation<UserResponse, CreateUserRequest>({
    query: (body) => ({
      url: "users",
      method: "POST",
      body: transformCreateUserRequest(body),
    }),
    transformResponse: transformUserResponse,
    invalidatesTags: [{ type: "User", id: "LIST" }],
  }),
  updateUser: builder.mutation<UserResponse, UpdateUserRequest>({
    query: (request) => ({
      url: `users/${encodeURIComponent(request.id)}`,
      method: "PUT",
      body: transformUpdateUserRequest(request),
    }),
    transformResponse: transformUserResponse,
    invalidatesTags: (_result, _error, request) => [
      { type: "User", id: request.id },
      { type: "User", id: "LIST" },
    ],
  }),
  deleteUser: builder.mutation<DeleteUserResponse, DeleteUserRequest>({
    query: ({ id }) => ({
      url: `users/${encodeURIComponent(id)}`,
      method: "DELETE",
    }),
    transformResponse: (response: unknown, _meta, request) =>
      transformDeleteUserResponse(response, request.id),
    invalidatesTags: (_result, _error, request) => [
      { type: "User", id: request.id },
      { type: "User", id: "LIST" },
    ],
  }),
});
