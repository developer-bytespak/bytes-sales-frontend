"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}


export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // For demo purposes, we'll show the dashboard regardless of auth status
  // In a real app, you'd want proper authentication checks
  const isDemoMode = true; // Always allow demo mode for now

  // Show loading state while checking authentication (only if not in demo mode)
  if (status === "loading" && !isDemoMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}

          {/* Sidebar */}
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
              sidebarCollapsed ? "w-16" : "w-64"
            )}
          >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-14 px-3 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="ml-2 text-lg font-bold text-gray-900 transition-opacity duration-300">
                  Bytes Sales
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-1 py-2 space-y-0">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    // Only close mobile sidebar if it's open, don't affect collapsed state
                    if (sidebarOpen) {
                      setSidebarOpen(false);
                    }
                    // Don't prevent navigation, just handle sidebar state
                  }}
                  className={cn(
                    "group flex items-center rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden",
                    sidebarCollapsed ? "px-2 py-2 justify-center" : "px-2 py-1.5",
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-200"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 hover:shadow-sm hover:scale-[1.02]"
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full"></div>
                  )}
                  
                  {/* Icon with animation */}
                  <span className={cn(
                    "text-base transition-all duration-300",
                    sidebarCollapsed ? "" : "mr-3",
                    isActive 
                      ? "scale-110" 
                      : "group-hover:scale-110 group-hover:rotate-3"
                  )}>
                    {item.icon}
                  </span>
                  
                  {/* Text with animation - only show when not collapsed */}
                  {!sidebarCollapsed && (
                    <span className={cn(
                      "text-sm font-medium transition-all duration-300",
                      isActive 
                        ? "font-semibold" 
                        : "group-hover:font-medium"
                    )}>
                      {item.name}
                    </span>
                  )}
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              );
            })}
          </nav>

              {/* User section */}
              <div className="border-t border-gray-200 p-2">
                <Link 
                  href="/dashboard/profile"
                  onClick={(e) => {
                    // Only close mobile sidebar if it's open, don't affect collapsed state
                    if (sidebarOpen) {
                      setSidebarOpen(false);
                    }
                    // Don't prevent navigation, just handle sidebar state
                  }}
                  className={cn(
                    "group flex items-center rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 relative overflow-hidden",
                    sidebarCollapsed ? "p-2 justify-center" : "p-2"
                  )}
                  title={sidebarCollapsed ? `${session?.user?.name || "Demo User"} - View Profile` : undefined}
                >
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                    <span className="text-xs font-bold text-white group-hover:scale-110 transition-transform duration-300">
                      {session?.user?.name?.charAt(0) || "D"}
                    </span>
                  </div>
                  {!sidebarCollapsed && (
                    <div className="ml-2 flex-1 min-w-0 relative z-10">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 group-hover:font-semibold transition-all duration-300">
                        {session?.user?.name || "Demo User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-300">
                        {session?.user?.email || "demo@bytes-sales.com"}
                      </p>
                      <p className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        View Profile →
                      </p>
                    </div>
                  )}
                </Link>
                <div className={cn("flex justify-end", sidebarCollapsed ? "mt-1" : "mt-1")}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/auth/login")}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 h-6 w-6 p-0 rounded-lg transition-all duration-300 hover:scale-110"
                    title="Sign Out"
                  >
                    <svg className="w-3 h-3 transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </Button>
                </div>
              </div>
        </div>
      </div>

       {/* Main content */}
       <div className="flex-1 overflow-hidden">
         {/* Page content */}
         <main className="h-full bg-gray-50 overflow-y-auto">
           {children}
         </main>
       </div>
    </div>
  );
}
