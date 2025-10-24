"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: session, status } = useSession();

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "activity", name: "Activity", icon: "📈" },
  ];

  // Get user data from session or use demo data
  const userData = {
    name: session?.user?.name || "Demo User",
    email: session?.user?.email || "demo@bytes-sales.com",
    role: "Sales Manager", // This could come from user profile in a real app
    avatar: session?.user?.name?.charAt(0) || "D",
    joinDate: "2024-01-15", // This would come from user profile in a real app
    lastActive: new Date().toISOString(),
    stats: {
      totalCalls: 156,
      emailsSent: 89,
      dealsClosed: 23,
      conversionRate: 14.7
    }
  };

  // Activity data personalized for the current user
  const recentActivity = [
    {
      id: "1",
      type: "call",
      description: `${userData.name} completed call with Sarah Johnson`,
      time: "2 hours ago",
      icon: "📞"
    },
    {
      id: "2", 
      type: "email",
      description: `${userData.name} sent follow-up email to Mike Davis`,
      time: "4 hours ago",
      icon: "📧"
    },
    {
      id: "3",
      type: "deal",
      description: `${userData.name} closed deal with Acme Corp`,
      time: "1 day ago",
      icon: "💰"
    },
    {
      id: "4",
      type: "upload",
      description: `${userData.name} uploaded 50 new leads`,
      time: "2 days ago",
      icon: "📤"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-3 text-base">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Profile Header */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">{userData.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                          <Badge variant="success">{userData.role}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{userData.email}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Joined {formatDate(userData.joinDate)}</span>
                          <span>•</span>
                          <span>Last active {formatDate(userData.lastActive)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Total Calls</p>
                          <p className="text-2xl font-semibold text-gray-900">{userData.stats.totalCalls}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Emails Sent</p>
                          <p className="text-2xl font-semibold text-gray-900">{userData.stats.emailsSent}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12h-4m-7 0h-4L3 12c.512-.598 1.482-1 2.592-1H12zm0 0v9m-8.28-8.28a4 4 0 010 11.313M20.28 1.72a4 4 0 010 11.313" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Deals Closed</p>
                          <p className="text-2xl font-semibold text-gray-900">{userData.stats.dealsClosed}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18V10H3V4z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                          <p className="text-2xl font-semibold text-gray-900">{userData.stats.conversionRate}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{activity.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
