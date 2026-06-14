import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { buildQueryUrl } from "../_utils/queryParams";
import {
  transformCreateCollectionRequest,
  transformUpdateCollectionRequest,
} from "./transforms/collectionRequestTransform";
import {
  transformCollectionListResponse,
  transformCollectionResponse,
  transformDeleteCollectionResponse,
} from "./transforms/collectionResponseTransform";
import type {
  CollectionListRequest,
  CreateCollectionRequest,
  DeleteCollectionRequest,
  UpdateCollectionRequest,
} from "./types/requests";
import type {
  CollectionListResponse,
  CollectionResponse,
  DeleteCollectionResponse,
} from "./types/responses";

type Builder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  "Location" | "User" | "Collection",
  "api"
>;

export const collectionEndpoints = (builder: Builder) => ({
  getCollections: builder.query<CollectionListResponse, CollectionListRequest | void>({
    query: (params) => buildQueryUrl(params ?? {}, "collections"),
    transformResponse: transformCollectionListResponse,
    providesTags: (result) =>
      result
        ? [
            ...result.data.map((collection) => ({
              type: "Collection" as const,
              id: collection.id,
            })),
            { type: "Collection" as const, id: "LIST" },
          ]
        : [{ type: "Collection" as const, id: "LIST" }],
  }),
  getCollectionById: builder.query<CollectionResponse, string>({
    query: (id) => `collections/${encodeURIComponent(id)}`,
    transformResponse: transformCollectionResponse,
    providesTags: (_result, _error, id) => [{ type: "Collection", id }],
  }),
  createCollection: builder.mutation<CollectionResponse, CreateCollectionRequest>({
    query: (body) => ({
      url: "collections",
      method: "POST",
      body: transformCreateCollectionRequest(body),
    }),
    transformResponse: transformCollectionResponse,
    invalidatesTags: [{ type: "Collection", id: "LIST" }],
  }),
  updateCollection: builder.mutation<CollectionResponse, UpdateCollectionRequest>({
    query: (request) => ({
      url: `collections/${encodeURIComponent(request.id)}`,
      method: "PUT",
      body: transformUpdateCollectionRequest(request),
    }),
    transformResponse: transformCollectionResponse,
    invalidatesTags: (_result, _error, request) => [
      { type: "Collection", id: request.id },
      { type: "Collection", id: "LIST" },
    ],
  }),
  deleteCollection: builder.mutation<DeleteCollectionResponse, DeleteCollectionRequest>({
    query: ({ id }) => ({
      url: `collections/${encodeURIComponent(id)}`,
      method: "DELETE",
    }),
    transformResponse: (response: unknown, _meta, request) =>
      transformDeleteCollectionResponse(response, request.id),
    invalidatesTags: (_result, _error, request) => [
      { type: "Collection", id: request.id },
      { type: "Collection", id: "LIST" },
    ],
  }),
});
