import { normalizeDigits } from "../../../../auth/utils";
import type { LoginRequest, SendOtpRequest } from "../types/requests";

export const transformSendOtpRequest = (request: SendOtpRequest) => ({
  phone: normalizeDigits(request.phone),
});

export const transformLoginRequest = (request: LoginRequest) => ({
  phone: normalizeDigits(request.phone),
  otp: normalizeDigits(request.otp),
  otpToken: request.otpToken,
});
