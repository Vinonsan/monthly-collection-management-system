import { baseApi } from "../base/api";
import { authEndpoints } from "./endpoints";

export const authApi = baseApi.injectEndpoints({
  endpoints: authEndpoints,
  overrideExisting: false,
});

export const { useLoginMutation, useSendOtpMutation } = authApi;
