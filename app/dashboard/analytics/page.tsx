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
          <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600 mt-2">Track your sales performance and key metrics</p>
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
                variant={timeRange === range.value ? "default" : "outline"}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.monthlyRevenue.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 text-sm font-medium text-gray-600">{month.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(month.revenue / 70000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(month.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stage Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.stagePerformance.map((stage, index) => (
                  <div key={stage.stage} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-20 text-sm font-medium text-gray-600">
                        {stage.stage.replace('-', ' ')}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${stage.conversion}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {stage.count} deals
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topPerformers.map((performer, index) => (
                  <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {performer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{performer.name}</div>
                        <div className="text-sm text-gray-500">{performer.deals} deals</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(performer.revenue)}
                      </div>
                      <div className="text-sm text-gray-500">{performer.winRate}% win rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 text-2xl">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                      {activity.value > 0 && (
                        <p className="text-sm font-semibold text-green-600">
                          {formatCurrency(activity.value)}
                        </p>
                      )}
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
