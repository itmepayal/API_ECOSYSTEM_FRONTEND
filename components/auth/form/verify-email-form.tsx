"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

import { AuthButton } from "@/components/auth/common/auth-button";
import { AuthText } from "@/components/auth/common/auth-text";
import { AuthHeading } from "@/components/auth/common/auth-heading";
import { Alert } from "@/components/auth/common/alert";

export const VerifyEmailForm = () => {
  const router = useRouter();
  const params = useParams();

  const token = params?.token as string;

  const { verifyEmail, loading, error } = useAuthStore();

  const [success, setSuccess] = useState("");

  const handleVerify = async () => {
    if (!token) return;

    const res = await verifyEmail({ token });

    if (res) {
      setSuccess("Email verified successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0c0c0c] border border-[#242424] rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <AuthHeading
          label="Verify Your Email"
          description="Click the button below to verify your email address."
        />

        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}

        {error && <Alert type="error" message={error} />}

        <AuthButton
          label="Verify Email"
          loading={loading}
          onClick={handleVerify}
        />

        <AuthText text="Back to" linkText="Sign In" linkTo="/login" />
      </div>
    </div>
  );
};
