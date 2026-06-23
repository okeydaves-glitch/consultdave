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
      <EmailSignUp />
    </AuthCard>
  );
}
