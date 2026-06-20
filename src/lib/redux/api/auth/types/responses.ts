export interface SendOtpResponse {
  success: boolean;
  message: string;
  otpToken: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  expiresAt?: number | string;
}
