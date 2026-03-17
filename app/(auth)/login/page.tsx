import { LoginForm } from "@/components/auth/form/login-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-b from-[#1E1E1E] to-[#050505] p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
