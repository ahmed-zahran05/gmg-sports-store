"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { supabase } from "@/lib/supabase";

export function AuthButton() {
  const [loading, setLoading] = useState(false);
  const hasAuth = Boolean(supabase);

  async function handleSignIn() {
    if (!supabase) return;
    setLoading(true);
    await supabase.auth.signInWithOAuth({ provider: "github" });
    setLoading(false);
  }

  return (
    <Button onClick={handleSignIn} disabled={loading || !hasAuth} variant="ghost">
      {loading ? "Connecting..." : hasAuth ? "Sign in" : "Auth unavailable"}
    </Button>
  );
}
