import api from "@/services/api";
import type {
  EmailData,
  LoginData,
  RegisterData,
  ResetPasswordData,
  TokenData,
} from "@/types/auth";

export const registerAPI = (data: RegisterData) =>
  api.post("/api/v1/accounts/register/", data);

export const loginAPI = (data: LoginData) =>
  api.post("/api/v1/accounts/login/", data);

export const logoutAPI = () => api.post("/api/v1/accounts/logout/");

export const refreshTokenAPI = () =>
  api.post("/api/v1/accounts/refresh-token/");

export const verifyEmailAPI = (data: TokenData) =>
  api.post("/api/v1/accounts/verify-email/", data);

export const googleAPI = (data: TokenData) =>
  api.post("/api/v1/accounts/google/", data);

export const forgotPasswordAPI = (data: EmailData) =>
  api.post("/api/v1/accounts/forgot-password/", data);

export const resetPasswordAPI = (data: ResetPasswordData) =>
  api.post("/api/v1/accounts/reset-password/", data);

export const changePasswordAPI = (data: unknown) =>
  api.post("/api/v1/accounts/change-password/", data);
