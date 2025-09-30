import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center space-y-6">
      <Logo />
      <AuthForm />
    </div>
  );
}
