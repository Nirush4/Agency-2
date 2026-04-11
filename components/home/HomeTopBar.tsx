"use client";

import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/service/api/supabaseClient";

interface UserProfile {
  username: string;
  avatar_url: string;
}

function getProfileFromStorage(): UserProfile | null {
  const username = localStorage.getItem("username");
  const avatar_url = localStorage.getItem("avatar_url");
  if (!username) return null;
  return {
    username,
    avatar_url:
      avatar_url ??
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  };
}

export default function HomeTopBar() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session?.user) {
          setProfile(null);
          return;
        }

        // Use localStorage cache if available (populated by login page)
        const cached = getProfileFromStorage();
        if (cached) {
          setProfile(cached);
          return;
        }

        // Fallback: fetch from Supabase (username from users, avatar from profiles)
        const [{ data: userData }, { data: profileData }] = await Promise.all([
          supabase
            .from("users")
            .select("username")
            .eq("id", session.user.id)
            .single(),
          supabase
            .from("profiles")
            .select("avatar_url")
            .eq("id", session.user.id)
            .single(),
        ]);

        if (userData) {
          const profile = {
            username: userData.username ?? "",
            avatar_url:
              profileData?.avatar_url ??
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          };
          localStorage.setItem("username", profile.username);
          localStorage.setItem("avatar_url", profile.avatar_url);
          setProfile(profile);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="mb-6 flex items-center justify-end gap-3">
      {profile ? (
        <>
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.username}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9d4c8] text-[#697542] transition hover:bg-[#e7e2d8]"
            >
              <CircleUserRound size={18} />
            </button>
          )}
          <span className="text-sm font-bold text-[#ffffff]">
            {profile.username}
          </span>
        </>
      ) : (
        <>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9d4c8] text-[#697542] transition hover:bg-[#e7e2d8]"
          >
            <CircleUserRound size={18} />
          </button>
          <Link href="/login">
            <button
              type="button"
              className="rounded-md bg-[#d9d4c8] px-4 py-2 text-xs font-medium text-[#2b2f24] transition hover:bg-[#e7e2d8]"
            >
              Login
            </button>
          </Link>
          <Link href="/register">
            <button
              type="button"
              className="rounded-md bg-[#d9d4c8] px-4 py-2 text-xs font-medium text-[#2b2f24] transition hover:bg-[#e7e2d8]"
            >
              Register
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
