"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

import { PasswordField } from "@/components/auth/common/password-field";
import { AuthButton } from "@/components/auth/common/auth-button";
import { AuthText } from "@/components/auth/common/auth-text";
import { AuthHeading } from "@/components/auth/common/auth-heading";
import { Alert } from "@/components/auth/common/alert";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const params = useParams();

  const token =
    typeof params?.token === "string" ? params.token : params?.token?.[0];

  const { resetPassword, loading, fieldErrors } = useAuthStore();

  const [form, setForm] = useState({
    password: "",
    confirm_password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    const payload = {
      token,
      password: form.password,
    };

    const res = await resetPassword(payload);

    if (res) {
      setSuccess("Password reset successful!");
      setForm({ password: "", confirm_password: "" });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      setError("Failed to reset password. Check your token or password.");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0c0c0c] border border-[#242424] rounded-2xl p-6 sm:p-8 shadow-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-4"
      >
        {/* ✅ FIXED HERE */}
        <AuthHeading
          label="Reset Password"
          description="Enter your new password below"
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

        <PasswordField
          name="password"
          placeholder="Enter new password"
          value={form.password}
          onChange={handleChange}
        />

        {fieldErrors?.password && (
          <p className="text-red-500 text-sm w-full text-left">
            {fieldErrors.password[0]}
          </p>
        )}

        <PasswordField
          name="confirm_password"
          placeholder="Confirm new password"
          value={form.confirm_password}
          onChange={handleChange}
        />

        <AuthButton label="Reset Password" loading={loading} />

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
