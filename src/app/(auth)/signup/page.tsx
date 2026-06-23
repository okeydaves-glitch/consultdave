import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { EmailSignUp } from "@/components/auth/EmailSignUp";
import { AuthCard } from "@/components/auth/AuthCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignUpPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join Consult Dave today"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </>
      }
    >
      <GoogleSignInButton />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">or sign up with email</span>
        </div>
      </div>
      <EmailSignUp />
    </AuthCard>
  );
}
