import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { AuthCard } from "@/components/auth/AuthCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your Consult Dave account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Sign up
          </Link>
        </>
      }
    >
      <GoogleSignInButton />
      <div className="text-center text-xs text-muted-foreground">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </div>
    </AuthCard>
  );
}
