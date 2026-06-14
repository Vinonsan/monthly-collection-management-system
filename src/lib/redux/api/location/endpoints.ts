import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { buildQueryUrl } from "../_utils/queryParams";
import {
  transformCreateLocationRequest,
  transformUpdateLocationRequest,
} from "./transforms/locationRequestTransform";
import {
  transformDeleteLocationResponse,
  transformLocationListResponse,
  transformLocationResponse,
} from "./transforms/locationResponseTransform";
import type {
  CreateLocationRequest,
  DeleteLocationRequest,
  LocationListRequest,
  UpdateLocationRequest,
} from "./types/requests";
import type {
  DeleteLocationResponse,
  LocationListResponse,
  LocationResponse,
} from "./types/responses";

type Builder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  "Location" | "User" | "Collection",
  "api"
>;

export const locationEndpoints = (builder: Builder) => ({
  getLocations: builder.query<LocationListResponse, LocationListRequest | void>({
    query: (params) => buildQueryUrl(params ?? {}, "locations"),
    transformResponse: transformLocationListResponse,
    providesTags: (result) =>
      result
        ? [
            ...result.data.map((location) => ({
              type: "Location" as const,
              id: location.id,
            })),
            { type: "Location" as const, id: "LIST" },
          ]
        : [{ type: "Location" as const, id: "LIST" }],
  }),
  getLocationById: builder.query<LocationResponse, string>({
    query: (id) => `locations/${encodeURIComponent(id)}`,
    transformResponse: transformLocationResponse,
    providesTags: (_result, _error, id) => [{ type: "Location", id }],
  }),
  createLocation: builder.mutation<LocationResponse, CreateLocationRequest>({
    query: (body) => ({
      url: "locations",
      method: "POST",
      body: transformCreateLocationRequest(body),
    }),
    transformResponse: transformLocationResponse,
    invalidatesTags: [{ type: "Location", id: "LIST" }],
  }),
  updateLocation: builder.mutation<LocationResponse, UpdateLocationRequest>({
    query: (request) => ({
      url: `locations/${encodeURIComponent(request.id)}`,
      method: "PUT",
      body: transformUpdateLocationRequest(request),
    }),
    transformResponse: transformLocationResponse,
    invalidatesTags: (_result, _error, request) => [
      { type: "Location", id: request.id },
      { type: "Location", id: "LIST" },
    ],
  }),
  deleteLocation: builder.mutation<DeleteLocationResponse, DeleteLocationRequest>({
    query: ({ id }) => ({
      url: `locations/${encodeURIComponent(id)}`,
      method: "DELETE",
    }),
    transformResponse: (response: unknown, _meta, request) =>
      transformDeleteLocationResponse(response, request.id),
    invalidatesTags: (_result, _error, request) => [
      { type: "Location", id: request.id },
      { type: "Location", id: "LIST" },
    ],
  }),
});
