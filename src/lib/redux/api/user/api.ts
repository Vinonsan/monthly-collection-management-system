import { baseApi } from "../base/api";
import { userEndpoints } from "./endpoints";

export const userApi = baseApi.injectEndpoints({
  endpoints: userEndpoints,
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} = userApi;
