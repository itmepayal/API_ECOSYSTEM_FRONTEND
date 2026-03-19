"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

import { GoogleLoginButton } from "@/components/auth/form/google-button";
import { InputField } from "@/components/auth/common/input-field";
import { PasswordField } from "@/components/auth/common/password-field";
import { AuthButton } from "@/components/auth/common/auth-button";
import { AuthText } from "@/components/auth/common/auth-text";
import { AuthHeading } from "@/components/auth/common/auth-heading";
import { Alert } from "@/components/auth/common/alert";
import { Divider } from "@/components/auth/common/divider";

export function LoginForm() {
  const router = useRouter();
  const { login, loading, fieldErrors, user } = useAuthStore();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const res = await login(form);

    if (res) {
      setSuccess("Login successful!");

      setForm({
        email: "",
        password: "",
      });

      setTimeout(() => {
        if (user?.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/playground");
        }
      }, 1500);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0c0c0c] border border-[#242424] rounded-2xl p-6 sm:p-8 shadow-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-3"
      >
        <AuthHeading
          label="Welcome Back"
          description="Sign in to continue to your account"
        />

        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}

        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}

        {/* GOOGLE LOGIN */}
        <GoogleLoginButton setSuccess={setSuccess} setError={setError} />

        <Divider label="or sign in with email" />

        {/* EMAIL FIELD */}
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />

        {fieldErrors?.email && (
          <p className="text-red-500 text-sm w-full text-left mt-1">
            {fieldErrors.email[0]}
          </p>
        )}

        {/* PASSWORD FIELD */}
        <PasswordField
          className="mt-4"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
        />

        {fieldErrors?.password && (
          <p className="text-red-500 text-sm w-full text-left mt-1">
            {fieldErrors.password[0]}
          </p>
        )}

        <AuthText
          text=""
          linkText="Forgot password?"
          linkTo="/forgot-password"
          className="w-full text-end"
        />

        <AuthButton label="Sign In" loading={loading} />

        <AuthText
          text="Don’t have an account?"
          linkText="Sign Up"
          linkTo="/register"
        />
      </form>
    </div>
  );
}
