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
} from "@/services/auth-service";

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

const setAuthCookies = (token: string, role: string) => {
  document.cookie = `accessToken=${token}; path=/; SameSite=Lax`;
  document.cookie = `role=${role}; path=/; SameSite=Lax`;
};

const clearAuthCookies = () => {
  document.cookie = "accessToken=; Max-Age=0; path=/";
  document.cookie = "role=; Max-Age=0; Max-Age=0; path=/";
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      fieldErrors: null,

      login: async (data: LoginData) => {
        set({ loading: true, error: null, fieldErrors: null });

        try {
          const res = await loginAPI(data);

          const token = res.data.data.access_token;
          const user = res.data.data.user;

          setAuthCookies(token, user.role);

          set({
            user,
            loading: false,
            error: null,
            fieldErrors: null,
          });

          return true;
        } catch (err: any) {
          const message = err.response?.data?.message || "Login failed";
          const fields = err.response?.data?.errors || null;

          set({
            error: message,
            fieldErrors: fields,
            loading: false,
          });

          return false;
        }
      },

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
          const message = err.response?.data?.message || "Registration failed";
          const fields = err.response?.data?.errors || null;

          set({
            error: message,
            fieldErrors: fields,
            loading: false,
          });

          return false;
        }
      },

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

      forgotPassword: async (data: EmailData) => {
        set({ loading: true, error: null, fieldErrors: null });

        try {
          await forgotPasswordAPI(data);

          set({ loading: false, error: null, fieldErrors: null });
          return true;
        } catch (err: any) {
          const message =
            err.response?.data?.message || "Forgot password failed";
          const fields = err.response?.data?.errors || null;

          set({
            loading: false,
            error: message,
            fieldErrors: fields,
          });

          return false;
        }
      },

      resetPassword: async (data: ResetPasswordData) => {
        set({ loading: true, error: null, fieldErrors: null });

        try {
          await resetPasswordAPI(data);

          set({ loading: false, error: null, fieldErrors: null });
          return true;
        } catch (err: any) {
          const message =
            err.response?.data?.message || "Reset password failed";
          const fields = err.response?.data?.errors || null;

          set({
            loading: false,
            error: message,
            fieldErrors: fields,
          });

          return false;
        }
      },

      googleLogin: async (data: TokenData) => {
        set({ loading: true, error: null, fieldErrors: null });

        try {
          const res = await googleAPI(data);

          const token = res.data.data.access_token;
          const user = res.data.data.user;

          setAuthCookies(token, user.role);

          set({
            user,
            loading: false,
            error: null,
            fieldErrors: null,
          });

          return true;
        } catch (err: any) {
          const message = err.response?.data?.message || "Google login failed";
          const fields = err.response?.data?.errors || null;

          set({
            error: message,
            fieldErrors: fields,
            loading: false,
          });

          return false;
        }
      },

      logout: async () => {
        set({ loading: true });

        try {
          await logoutAPI();
        } catch {
          console.warn("Logout API failed");
        }

        clearAuthCookies();
        localStorage.removeItem("auth-storage");

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
