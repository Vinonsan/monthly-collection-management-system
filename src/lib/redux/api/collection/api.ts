import { baseApi } from "../base/api";
import { collectionEndpoints } from "./endpoints";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: collectionEndpoints,
  overrideExisting: false,
});

export const {
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionByIdQuery,
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
} = collectionApi;
