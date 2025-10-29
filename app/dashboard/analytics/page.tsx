"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - in real app this would come from API
const mockAnalytics = {
  overview: {
    totalRevenue: 250000,
    totalDeals: 45,
    winRate: 68,
    avgDealSize: 12500,
    pipelineValue: 180000,
    conversionRate: 12.5
  },
  monthlyRevenue: [
    { month: "Jan", revenue: 45000, deals: 8 },
    { month: "Feb", revenue: 52000, deals: 9 },
    { month: "Mar", revenue: 38000, deals: 7 },
    { month: "Apr", revenue: 61000, deals: 11 },
    { month: "May", revenue: 48000, deals: 8 },
    { month: "Jun", revenue: 55000, deals: 10 }
  ],
  stagePerformance: [
    { stage: "Lead", count: 25, conversion: 40 },
    { stage: "Qualified", count: 15, conversion: 60 },
    { stage: "Proposal", count: 12, conversion: 75 },
    { stage: "Negotiation", count: 8, conversion: 85 },
    { stage: "Closed Won", count: 20, conversion: 100 },
    { stage: "Closed Lost", count: 10, conversion: 0 }
  ],
  topPerformers: [
    { name: "Alex Smith", deals: 12, revenue: 85000, winRate: 75 },
    { name: "Sarah Wilson", deals: 10, revenue: 72000, winRate: 70 },
    { name: "John Doe", deals: 8, revenue: 58000, winRate: 65 },
    { name: "Emily Davis", deals: 7, revenue: 45000, winRate: 60 }
  ],
  recentActivity: [
    {
      id: "1",
      type: "deal_closed",
      description: "Closed deal with TechCorp Inc",
      value: 50000,
      user: "Alex Smith",
      time: "2 hours ago"
    },
    {
      id: "2",
      type: "new_lead",
      description: "New lead from StartupXYZ",
      value: 12000,
      user: "Sarah Wilson",
      time: "4 hours ago"
    },
    {
      id: "3",
      type: "call_completed",
      description: "Call with Marketing Pro",
      value: 0,
      user: "John Doe",
      time: "6 hours ago"
    },
    {
      id: "4",
      type: "email_sent",
      description: "Follow-up email to Business Solutions",
      value: 0,
      user: "Emily Davis",
      time: "1 day ago"
    }
  ]
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [viewType, setViewType] = useState("overview");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deal_closed":
        return "💰";
      case "new_lead":
        return "👥";
      case "call_completed":
        return "📞";
      case "email_sent":
        return "📧";
      default:
        return "📊";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600 mt-2 text-base">Track your sales performance and key metrics</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-green-500 hover:border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Total Revenue</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {formatCurrency(mockAnalytics.overview.totalRevenue)}
              </div>
              <p className="text-xs text-green-600 font-medium">+12% from last period</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Total Deals</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {mockAnalytics.overview.totalDeals}
              </div>
              <p className="text-xs text-blue-600 font-medium">All time deals</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 hover:border-l-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Win Rate</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {mockAnalytics.overview.winRate}%
              </div>
              <p className="text-xs text-purple-600 font-medium">Deals closed won</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {[
              { value: "1month", label: "1 Month" },
              { value: "3months", label: "3 Months" },
              { value: "6months", label: "6 Months" },
              { value: "1year", label: "1 Year" }
            ].map((range) => (
              <Button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                variant={timeRange === range.value ? "primary" : "outline"}
                size="sm"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12h-4m-7 0h-4L3 12c.512-.598 1.482-1 2.592-1H12zm0 0v9m-8.28-8.28a4 4 0 010 11.313M20.28 1.72a4 4 0 010 11.313" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(mockAnalytics.overview.totalRevenue)}
                  </p>
                  <p className="text-xs text-green-600">+12% from last period</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Deals</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.overview.totalDeals}</p>
                  <p className="text-xs text-blue-600">+8% from last period</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Win Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.overview.winRate}%</p>
                  <p className="text-xs text-yellow-600">+3% from last period</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Avg Deal Size</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(mockAnalytics.overview.avgDealSize)}
                  </p>
                  <p className="text-xs text-purple-600">+5% from last period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Revenue Chart */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Revenue Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {mockAnalytics.monthlyRevenue.map((month, index) => (
                  <div key={month.month} className="hover:bg-blue-50 p-2 rounded transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700 w-8">{month.month}</span>
                        <span className="text-xs text-gray-500">{month.deals} deals</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(month.revenue)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(month.revenue / 70000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stage Performance */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Pipeline Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {mockAnalytics.stagePerformance.map((stage, index) => (
                  <div key={stage.stage} className="hover:bg-green-50 p-2 rounded transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700 w-16">
                          {stage.stage.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">{stage.count} deals</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {stage.conversion}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${stage.conversion}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Performers */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {mockAnalytics.topPerformers.map((performer, index) => (
                  <div key={performer.name} className="hover:bg-purple-50 p-3 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {performer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{performer.name}</div>
                          <div className="text-xs text-gray-500">{performer.deals} deals • {performer.winRate}% win rate</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(performer.revenue)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {mockAnalytics.recentActivity.map((activity, index) => (
                  <div key={activity.id} className="hover:bg-orange-50 p-3 rounded-lg transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-sm">{getActivityIcon(activity.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                          {activity.value > 0 && (
                            <span className="text-xs font-medium text-green-600">
                              {formatCurrency(activity.value)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatCurrency(mockAnalytics.overview.pipelineValue)}
                </div>
                <div className="text-sm text-gray-500">Pipeline Value</div>
                <div className="text-xs text-blue-600 mt-1">+15% from last month</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {mockAnalytics.overview.conversionRate}%
                </div>
                <div className="text-sm text-gray-500">Conversion Rate</div>
                <div className="text-xs text-green-600 mt-1">+2.1% from last month</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">24</div>
                <div className="text-sm text-gray-500">Active Deals</div>
                <div className="text-xs text-yellow-600 mt-1">+3 from last week</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
