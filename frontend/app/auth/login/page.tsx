"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/auth-api";
import { toast } from "@/components";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const accessToken = authApi.isAuthenticated();

  useEffect(() => {
    if (accessToken) {
      router.push("/resorts");
    }
  }, [accessToken, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await authApi.login({ email });
      router.push("/resorts");
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to log in. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to access your favorite resorts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="john.doe@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/users/create"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
