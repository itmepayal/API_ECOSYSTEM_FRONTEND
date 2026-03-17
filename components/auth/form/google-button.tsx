"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import type { AlertHandlers } from "@/types/auth";

export const GoogleLoginButton = ({ setSuccess, setError }: AlertHandlers) => {
  const { googleLogin } = useAuthStore();
  const router = useRouter();

  return (
    <div className="w-full flex justify-center mt-2">
      <GoogleLogin
        theme="filled_black"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
        onSuccess={async (credentialResponse) => {
          if (!credentialResponse.credential) {
            setError("Google authentication failed");
            return;
          }

          const success = await googleLogin({
            token: credentialResponse.credential,
          });

          if (success) {
            setSuccess("Successfully logged in with Google");

            setTimeout(() => {
              router.push("/playground");
            }, 1500);
          } else {
            setError("Google login failed");
          }
        }}
        onError={() => {
          setError("Google login failed");
        }}
      />
    </div>
  );
};
