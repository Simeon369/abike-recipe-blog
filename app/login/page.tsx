"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Sign in the user
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      if (!data.user) {
        setError("User not found");
        setLoading(false);
        return;
      }

      console.log("User signed in:", data.user.id);

      // 2️⃣ Fetch the user's profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        setError("Failed to fetch profile");
        setLoading(false);
        return;
      }
      console.log("User profile:", profile);

      // 3️⃣ Redirect based on role
      if (profile.is_admin === true) {
        router.push(`/admin?userId=${data.user.id}`);
      } else {
        router.push("/");
      }

    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "320px",
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "12px" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
