import { ForgotPasswordForm } from "@/components/auth/form/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-b from-[#1E1E1E] to-[#050505] p-4">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
