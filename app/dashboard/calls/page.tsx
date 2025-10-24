"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - in real app this would come from API
const mockCalls = [
  {
    id: "1",
    contactName: "Sarah Johnson",
    contactPhone: "+1 (555) 123-4567",
    contactCompany: "TechCorp Inc",
    callDate: "2024-01-15T14:30:00Z",
    duration: 420, // 7 minutes
    outcome: "interested",
    notes: "Discussed pricing options, very interested in our premium package. Follow up next week.",
    status: "completed"
  },
  {
    id: "2",
    contactName: "Mike Chen",
    contactPhone: "+1 (555) 987-6543",
    contactCompany: "StartupXYZ",
    callDate: "2024-01-15T11:15:00Z",
    duration: 180, // 3 minutes
    outcome: "callback",
    notes: "Busy with client meeting, asked to call back tomorrow at 2 PM.",
    status: "completed"
  },
  {
    id: "3",
    contactName: "Emily Davis",
    contactPhone: "+1 (555) 456-7890",
    contactCompany: "Marketing Pro",
    callDate: "2024-01-14T16:45:00Z",
    duration: 0,
    outcome: "no-answer",
    notes: "No answer, left voicemail about our services.",
    status: "completed"
  },
  {
    id: "4",
    contactName: "John Smith",
    contactPhone: "+1 (555) 321-0987",
    contactCompany: "Business Solutions",
    callDate: "2024-01-14T09:20:00Z",
    duration: 300, // 5 minutes
    outcome: "not-interested",
    notes: "Not interested at this time, but open to future contact in 6 months.",
    status: "completed"
  },
  {
    id: "5",
    contactName: "Lisa Wilson",
    contactPhone: "+1 (555) 654-3210",
    contactCompany: "Creative Agency",
    callDate: "2024-01-13T15:10:00Z",
    duration: 600, // 10 minutes
    outcome: "interested",
    notes: "Very interested in our services, wants to schedule a demo next week.",
    status: "completed"
  }
];

const outcomeColors = {
  interested: "success",
  "not-interested": "error",
  callback: "warning",
  "no-answer": "default",
  busy: "info"
} as const;

export default function CallsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredCalls = mockCalls.filter(call => {
    const matchesSearch = call.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.contactPhone.includes(searchTerm) ||
                         call.contactCompany.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOutcome = outcomeFilter === "all" || call.outcome === outcomeFilter;
    
    let matchesDate = true;
    if (dateFilter !== "all") {
      const callDate = new Date(call.callDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - callDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "today" && daysDiff > 0) matchesDate = false;
      if (dateFilter === "week" && daysDiff > 7) matchesDate = false;
      if (dateFilter === "month" && daysDiff > 30) matchesDate = false;
    }
    
    return matchesSearch && matchesOutcome && matchesDate;
  });

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return "No answer";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTotalDuration = () => {
    return mockCalls.reduce((total, call) => total + call.duration, 0);
  };

  const getOutcomeStats = () => {
    const stats = mockCalls.reduce((acc, call) => {
      acc[call.outcome] = (acc[call.outcome] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const outcomeStats = getOutcomeStats();

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Call History</h1>
          <p className="text-gray-600 mt-2">View and manage your call records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Calls</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockCalls.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Duration</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {Math.floor(getTotalDuration() / 60)}m {getTotalDuration() % 60}s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Interested</p>
                  <p className="text-2xl font-semibold text-gray-900">{outcomeStats.interested || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Not Interested</p>
                  <p className="text-2xl font-semibold text-gray-900">{outcomeStats['not-interested'] || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Outcome Filter */}
              <select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Outcomes</option>
                <option value="interested">Interested</option>
                <option value="not-interested">Not Interested</option>
                <option value="callback">Callback</option>
                <option value="no-answer">No Answer</option>
                <option value="busy">Busy</option>
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </CardHeader>
        </Card>

        {/* Calls Table */}
        <Card>
          <CardContent className="p-0">
            {filteredCalls.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No calls found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or start making calls.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Outcome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCalls.map((call) => (
                      <tr key={call.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{call.contactName}</div>
                            <div className="text-sm text-gray-500">{call.contactPhone}</div>
                            <div className="text-xs text-gray-400">{call.contactCompany}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(call.callDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(call.duration)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={outcomeColors[call.outcome as keyof typeof outcomeColors]}>
                            {call.outcome.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={call.notes}>
                            {call.notes}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Call Again
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
