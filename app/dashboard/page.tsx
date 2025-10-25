"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data - in real app this would come from API
const metrics = {
  callsToday: 32,
  dealsClosed: 5,
  emailsSent: 18,
  conversionRate: 15.6
};

const recentActivity = [
  {
    id: 1,
    type: "deal",
    description: "Alex closed a deal with Sarah Johnson",
    timestamp: "2 minutes ago",
    user: "Alex Chen"
  },
  {
    id: 2,
    type: "upload",
    description: "John uploaded 200 leads from prospects.csv",
    timestamp: "15 minutes ago",
    user: "John Smith"
  },
  {
    id: 3,
    type: "email",
    description: "Email sent to Mike Johnson",
    timestamp: "1 hour ago",
    user: "Alex Chen"
  },
  {
    id: 4,
    type: "call",
    description: "Call completed with TechCorp Inc",
    timestamp: "2 hours ago",
    user: "Sarah Wilson"
  }
];

const activityIcons = {
  deal: "💰",
  upload: "📤",
  email: "📧",
  call: "📞"
};

export default function DashboardPage() {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    callsToday: 0,
    dealsClosed: 0,
    emailsSent: 0,
    conversionRate: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Animate metrics on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setAnimatedMetrics(metrics);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-2 sm:p-3">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
    <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-base">Welcome back! Here's what's happening with your sales today.</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Live</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Calls Made Today</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {isLoaded ? animatedMetrics.callsToday : "..."}
              </div>
              <p className="text-xs text-green-600 font-medium">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-green-500 hover:border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Deals Closed</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {isLoaded ? animatedMetrics.dealsClosed : "..."}
              </div>
              <p className="text-xs text-green-600 font-medium">+25% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 hover:border-l-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Emails Sent</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {isLoaded ? animatedMetrics.emailsSent : "..."}
              </div>
              <p className="text-xs text-blue-600 font-medium">+8% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-orange-500 hover:border-l-orange-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Conversion Rate</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {isLoaded ? animatedMetrics.conversionRate : "..."}%
              </div>
              <p className="text-xs text-green-600 font-medium">+2.1% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest actions from your team</CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start space-x-3 p-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-lg">{activityIcons[activity.type as keyof typeof activityIcons]}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium group-hover:text-gray-700 transition-colors">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="info" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                          {activity.user}
                        </Badge>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-5">
                <Button className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <span className="text-xl">📤</span>
                    </div>
                    <span className="font-semibold">Upload CSV</span>
                  </div>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>

                <Button className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <span className="text-xl">📞</span>
                    </div>
                    <span className="font-semibold">Start Calling</span>
                  </div>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>

                <Button className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <span className="text-xl">📝</span>
                    </div>
                    <span className="font-semibold">Manage Templates</span>
                  </div>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
    </DashboardLayout>
  );
}
