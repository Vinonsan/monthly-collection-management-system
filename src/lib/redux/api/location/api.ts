import { baseApi } from "../base/api";
import { locationEndpoints } from "./endpoints";

export const locationApi = baseApi.injectEndpoints({
  endpoints: locationEndpoints,
  overrideExisting: false,
});

export const {
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useGetLocationByIdQuery,
  useGetLocationsQuery,
  useUpdateLocationMutation,
} = locationApi;
