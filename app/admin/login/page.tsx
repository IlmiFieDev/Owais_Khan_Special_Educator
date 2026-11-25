"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createSupabaseBrowser();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Unable to sign in. Check your credentials.");
        setLoading(false);
        return;
      }

      router.replace("/admin");
    } catch {
      setError("Login is unavailable. Configure Supabase authentication first.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-soft border border-white/70 bg-frost/80 p-8 shadow-glass backdrop-blur"
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-dark">
          Secure access
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-ink">Admin login</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Restricted to the authorised administrator account.
        </p>

        <label className="label mt-6" htmlFor="admin-email">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          className="field"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label mt-4" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          className="field"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="mt-3 text-sm text-[#b42318]" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
