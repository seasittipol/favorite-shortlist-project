"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authApi } from "@/services/auth-api";
import { Palmtree, Home, Users, LogOut, User as UserIcon } from "lucide-react";
import NavLink from "./NavLink";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.replace("/", "");
  const user = authApi.getCurrentUser();
  console.log("Current user in Header:", user);
  const handleLogout = () => {
    authApi.logout();
    router.push("/auth/login");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Palmtree className="w-7 h-7" />
              Thailand Resorts
            </Link>
            <nav className="hidden md:flex gap-4">
              <NavLink
                href="/resorts"
                icon={Home}
                label="All Resorts"
                isActive={currentPage === "resorts"}
              />
              <NavLink
                href="/users"
                icon={Users}
                label="Users"
                isActive={currentPage === "users"}
              />
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right hidden sm:flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    {user}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
