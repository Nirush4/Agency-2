"use client";

import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../service/api/subabaseClient";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LoginPage(): JSX.Element {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Logging in...", {
      style: { backgroundColor: "var(--color-secondary)", color: "white" },
    });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.dismiss(toastId);
        toast.error(error.message, {
          style: { backgroundColor: "#FEE2E2", color: "#991B1B" },
        });
        setLoading(false);
        return;
      }

      if (data.user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", data.user.id)
          .single();

        if (profile) {
          localStorage.setItem("username", profile.username ?? "");
          localStorage.setItem(
            "avatar_url",
            profile.avatar_url ??
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          );
        }
      }

      toast.dismiss(toastId);
      toast.success("Logged in successfully!", {
        style: { backgroundColor: "var(--color-secondary)", color: "white" },
      });

      router.push("/");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error((err as Error).message || "Something went wrong", {
        style: { backgroundColor: "#FEE2E2", color: "#991B1B" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen px-4 sm:px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          fill
          className="w-full h-full object-cover opacity-80 scale-125 blur-xs"
          priority
        />
      </div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-200 transition-opacity duration-300"
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-h3 sm:text-h1 font-heading font-extrabold text-text">
            Welcome Back
          </h1>
          <p className="mt-2 text-text">
            Sign in to access your delicious recipes
          </p>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-text font-body font-medium"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full px-4 py-3 border rounded-xl text-text font-body focus:outline-none focus:ring-2 focus:ring-(--color-secondary) shadow-sm transition"
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-text font-body font-medium"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-3 border rounded-xl text-text font-body focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] pr-12 shadow-sm transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 cursor-pointer" />
              ) : (
                <Eye className="h-5 w-5 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="flex items-center justify-center w-full py-3 sm:py-4 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          {loading ? "Logging in…" : "Log in"}
        </button>

        <p className="mt-6 text-center text-text font-body">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold focus:outline-none focus:underline"
            style={{ color: "var(--color-secondary)" }}
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
