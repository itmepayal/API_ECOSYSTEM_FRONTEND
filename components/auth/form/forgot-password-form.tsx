"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

import { InputField } from "@/components/auth/common/input-field";
import { AuthButton } from "@/components/auth/common/auth-button";
import { AuthText } from "@/components/auth/common/auth-text";
import { AuthHeading } from "@/components/auth/common/auth-heading";
import { Alert } from "@/components/auth/common/alert";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const { forgotPassword, loading, fieldErrors } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await forgotPassword(form);

    if (res) {
      setSuccess("Reset link sent! Check your email.");
      setForm({ email: "" });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0c0c0c] border border-[#242424] rounded-2xl p-6 sm:p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <AuthHeading
          label="Forgot Password"
          description="Enter your email and we’ll send you a password reset link."
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

        {/* EMAIL FIELD */}
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="mt-2"
        />

        {fieldErrors?.email && (
          <p className="text-red-500 text-sm w-full text-left mt-1">
            {fieldErrors.email[0]}
          </p>
        )}

        <AuthButton label="Send Reset Link" loading={loading} />

        <AuthText
          text="Remember your password?"
          linkText="Sign In"
          linkTo="/login"
          className="w-full text-end mt-2"
        />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
