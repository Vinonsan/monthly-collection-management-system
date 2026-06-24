export interface SendOtpRequest {
  phone: string;
}

export interface LoginRequest {
  phone: string;
  otp: string;
  otpToken: string;
}
