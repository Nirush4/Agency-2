"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Search,
  Refrigerator,
  CalendarDays,
  Settings,
  Moon,
} from "lucide-react";

const desktopLinks = [
  { href: "/my-recipes", label: "My Recipes", icon: House },
  { href: "/search", label: "Search", icon: Search },
  { href: "/my-fridge", label: "My Fridge", icon: Refrigerator },
  { href: "/planner", label: "Weekly Planner", icon: CalendarDays },
  { href: "/settings", label: "Settings", icon: Settings },
];

const mobileLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/my-fridge", label: "Fridge", icon: Refrigerator },
  { href: "/search", label: "Search", icon: Search },
  { href: "/planner", label: "Planner", icon: CalendarDays },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:justify-between md:border-r md:border-[#2d3621] md:bg-[#1b232b] md:p-4">
        <div>
          <Link
            href="/"
            role="link"
            className="mb-8 flex h-14 items-center justify-center rounded-md bg-[#697542] text-xs font-semibold uppercase tracking-[0.2em] text-[#f5f1e8] transition hover:bg-[#7a8550]"
          >
            Logo
          </Link>

          <nav className="flex flex-col gap-4">
            {desktopLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm transition ${
                    isActive
                      ? "bg-[#697542]/20 font-semibold text-[#f5f1e8]"
                      : "text-[#cfc8b8] hover:bg-[#697542]/10 hover:text-[#f5f1e8]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-[#cfc8b8] transition hover:bg-[#697542]/10 hover:text-[#f5f1e8]">
          <Moon size={16} />
          <span>Dark/Light</span>
        </button>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#8a9460] bg-[#697542] text-[#f5f1e8] md:hidden">
        <div className="grid grid-cols-4">
          {mobileLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-1 py-3 text-[11px] transition ${
                  isActive ? "bg-[#5d673a]" : ""
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
