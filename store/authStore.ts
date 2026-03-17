import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  loginAPI,
  googleAPI,
  logoutAPI,
  registerAPI,
  verifyEmailAPI,
  resetPasswordAPI,
  forgotPasswordAPI,
} from "@/services/authService";

import type {
  EmailData,
  LoginData,
  RegisterData,
  ResetPasswordData,
  TokenData,
} from "@/types/auth";

interface User {
  id: number;
  email: string;
  username: string;
  role: "USER" | "ADMIN";
  avatar?: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]> | null;

  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  verifyEmail: (data: TokenData) => Promise<boolean>;
  forgotPassword: (email: EmailData) => Promise<boolean>;
  resetPassword: (data: ResetPasswordData) => Promise<boolean>;
  logout: () => Promise<boolean>;
  googleLogin: (data: TokenData) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      fieldErrors: null,

      // LOGIN
      login: async (data: LoginData) => {
        set({ loading: true, error: null, fieldErrors: null });

        try {
          const res = await loginAPI(data);

          const token = res.data.data.access_token;
          const user = res.data.data.user;

          localStorage.setItem("accessToken", token);

          set({
            user,
            loading: false,
            error: null,
            fieldErrors: null,
          });

          return true;
        } catch (err: any) {
          let message = "Login failed";
          let fields = null;

          if (err.response?.data?.errors) {
            fields = err.response.data.errors;
          }

          if (err.response?.data?.message) {
            message = err.response.data.message;
          }

          set({
            error: message,
            fieldErrors: fields,
            loading: false,
          });

          return false;
        }
      },

      // REGISTER
      register: async (data: RegisterData) => {
        set({ loading: true, error: null, fieldErrors: null });

        try {
          await registerAPI(data);

          set({
            loading: false,
            error: null,
            fieldErrors: null,
          });

          return true;
        } catch (err: any) {
          let message = "Registration failed";
          let fields = null;

          if (err.response?.data?.errors) {
            fields = err.response.data.errors;
          }

          if (err.response?.data?.message) {
            message = err.response.data.message;
          }

          set({
            error: message,
            fieldErrors: fields,
            loading: false,
          });

          return false;
        }
      },

      // VERIFY EMAIL
      verifyEmail: async (data: TokenData) => {
        set({ loading: true, error: null });

        try {
          await verifyEmailAPI(data);

          set({
            loading: false,
            error: null,
          });

          return true;
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Email verification failed",
            loading: false,
          });

          return false;
        }
      },

      // FORGOT PASSWORD
      forgotPassword: async (data: EmailData) => {
        set({ loading: true, error: null, fieldErrors: null });
        try {
          await forgotPasswordAPI(data);
          set({ loading: false, error: null, fieldErrors: null });
          return true;
        } catch (err: any) {
          const fields = err.response?.data?.errors ?? null;
          const message =
            err.response?.data?.message ?? "Forgot password failed";
          set({ loading: false, error: message, fieldErrors: fields });
          return false;
        }
      },

      // RESET PASSWORD
      resetPassword: async (data: ResetPasswordData) => {
        set({ loading: true, error: null, fieldErrors: null });
        try {
          await resetPasswordAPI(data);
          set({ loading: false, error: null, fieldErrors: null });
          return true;
        } catch (err: any) {
          const fields = err.response?.data?.errors ?? null;
          const message =
            err.response?.data?.message ?? "Reset password failed";
          set({ loading: false, error: message, fieldErrors: fields });
          return false;
        }
      },

      // GOOGLE
      googleLogin: async (data: { token: string }) => {
        set({ loading: true, error: null, fieldErrors: null });

        try {
          const res = await googleAPI(data);

          console.log(res);

          const token = res.data.data.access_token;
          const user = res.data.data.user;

          console.log(res);

          localStorage.setItem("accessToken", token);

          set({
            user,
            loading: false,
            error: null,
            fieldErrors: null,
          });

          return true;
        } catch (err: any) {
          let message = "Google login failed";
          let fields = null;

          if (err.response?.data?.errors) {
            fields = err.response.data.errors;
          }

          if (err.response?.data?.message) {
            message = err.response.data.message;
          }

          set({
            error: message,
            fieldErrors: fields,
            loading: false,
          });

          return false;
        }
      },

      // LOGOUT
      logout: async () => {
        set({ loading: true });

        try {
          await logoutAPI();
        } catch (err) {
          console.warn("Logout request failed");
        }

        localStorage.removeItem("accessToken");

        set({
          user: null,
          loading: false,
          error: null,
          fieldErrors: null,
        });

        return true;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
