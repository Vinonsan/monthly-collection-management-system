import type { LoginResponse, SendOtpResponse } from "../types/responses";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const transformSendOtpResponse = (response: unknown): SendOtpResponse => {
  if (!isObject(response)) {
    return { success: false, message: "Invalid response", otpToken: "" };
  }

  return {
    success: Boolean(response.success),
    message: String(response.message ?? ""),
    otpToken: String(response.otpToken ?? ""),
  };
};

export const transformLoginResponse = (response: unknown): LoginResponse => {
  if (!isObject(response)) {
    return { success: false, message: "Invalid response", token: "" };
  }

  const token = String(response.token ?? response.accessToken ?? "");

  return {
    success: Boolean(response.success),
    message: String(response.message ?? ""),
    token,
    expiresAt: response.expiresAt as number | string | undefined,
  };
};
