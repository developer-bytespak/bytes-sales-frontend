"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
      // Show error message to user
      alert("Google OAuth is not configured. Please use Demo Mode or set up Google OAuth credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    // For demo purposes, we'll simulate a successful login
    // In a real app, this would be handled by NextAuth
    window.location.href = "/dashboard";
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex overflow-hidden">
      {/* Left Side - Logo and Branding */}
      <div className="w-1/2 flex flex-col items-center justify-center p-12 relative">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Bytes Sales
          </h1>
          <p className="text-gray-600 text-2xl">Streamline your sales calling workflow</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome back</h2>
              <p className="text-gray-600 text-xl">Sign in to continue to your dashboard</p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="group w-full flex items-center justify-center px-8 py-5 border-2 border-gray-200 rounded-2xl shadow-lg bg-white text-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-indigo-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 mb-6"
            >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin mr-3" />
            ) : (
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isLoading ? "Signing in..." : "Continue with Google"}
          </button>

            {/* Demo Sign In Button */}
            <button
              onClick={handleDemoSignIn}
              className="group w-full flex items-center justify-center px-8 py-5 border-2 border-indigo-300 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-50 to-blue-50 text-lg font-semibold text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-400 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Try Demo Mode
          </button>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-500">
              <p className="opacity-80">By signing in, you agree to our <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer underline">Terms of Service</span> and <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer underline">Privacy Policy</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
