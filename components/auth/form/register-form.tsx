"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

import { InputField } from "@/components/auth/common/input-field";
import { PasswordField } from "@/components/auth/common/password-field";
import { AuthButton } from "@/components/auth/common/auth-button";
import { AuthText } from "@/components/auth/common/auth-text";
import { AuthHeading } from "@/components/auth/common/auth-heading";
import { Alert } from "@/components/auth/common/alert";

export const RegisterForm = () => {
  const router = useRouter();
  const { register, loading, fieldErrors } = useAuthStore();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    const res = await register(payload);

    if (res) {
      setSuccess("Register successful!");

      setForm({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0c0c0c] border border-[#242424] rounded-2xl p-6 sm:p-8 shadow-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-3"
      >
        <AuthHeading
          label="Create Account"
          description="Start your journey with us today"
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

        <InputField
          type="text"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          className="mt-5"
        />

        {fieldErrors?.username && (
          <p className="text-red-500 text-sm w-full text-left">
            {fieldErrors.username[0]}
          </p>
        )}

        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="mt-5"
        />

        {fieldErrors?.email && (
          <p className="text-red-500 text-sm w-full text-left">
            {fieldErrors.email[0]}
          </p>
        )}

        <PasswordField
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="mt-5"
        />

        {fieldErrors?.password && (
          <p className="text-red-500 text-sm w-full text-left">
            {fieldErrors.password[0]}
          </p>
        )}

        <PasswordField
          name="confirm_password"
          placeholder="Confirm your password"
          value={form.confirm_password}
          onChange={handleChange}
          className="mt-5"
        />

        <AuthButton label="Sign Up" loading={loading} />

        <AuthText
          text="Already have an account?"
          linkText="Sign In"
          linkTo="/login"
        />
      </form>
    </div>
  );
};
