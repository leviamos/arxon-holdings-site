"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ArxonNav() {
  const path = usePathname();

  const linkClasses = (href: string) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      path === href
        ? "bg-neutral-800 text-white"
        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
    }`;

  return (
    <nav className="w-full border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <div className="text-xl font-bold tracking-tight text-white">
          ARXON
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2">
          <Link href="/console" className={linkClasses("/console")}>
            Console
          </Link>

          {/* Future pages */}
          <Link href="/systems" className={linkClasses("/systems")}>
            Systems
          </Link>

          <Link href="/settings" className={linkClasses("/settings")}>
            Settings
          </Link>

          <Link href="/about" className={linkClasses("/about")}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
