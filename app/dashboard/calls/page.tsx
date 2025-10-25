"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CallControlPanel } from "@/components/call/call-control-panel";
import { NotificationContainer, NotificationItem } from "@/components/ui/notification";

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
  const [showCallPanel, setShowCallPanel] = useState(false);
  const [selectedCallForCall, setSelectedCallForCall] = useState<any>(null);
  const [showCallDetails, setShowCallDetails] = useState(false);
  const [selectedCallForDetails, setSelectedCallForDetails] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCallForEdit, setSelectedCallForEdit] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

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

  const addNotification = (notification: Omit<NotificationItem, "id">) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleViewCall = (call: any) => {
    setSelectedCallForDetails(call);
    setShowCallDetails(true);
  };

  const handleCloseCallDetails = () => {
    setShowCallDetails(false);
    setSelectedCallForDetails(null);
  };

  const handleCallAgain = (call: any) => {
    setSelectedCallForCall(call);
    setShowCallPanel(true);
    addNotification({
      type: "success",
      title: "Call Again",
      message: `Starting call to ${call.contactName} at ${call.contactPhone}. The call control panel is now open.`,
      duration: 4000
    });
  };

  const handleCloseCallPanel = () => {
    setShowCallPanel(false);
    setSelectedCallForCall(null);
  };

  const handleEditCall = (call: any) => {
    setSelectedCallForEdit(call);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCallForEdit(null);
  };

  const handleSaveCall = (updatedCall: any) => {
    console.log("Saving call:", updatedCall);
    addNotification({
      type: "success",
      title: "Call Updated",
      message: `Call details for ${updatedCall.contactName} have been successfully updated.`,
      duration: 4000
    });
    handleCloseEditModal();
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Call History</h1>
          <p className="text-gray-600 mt-2 text-base">View and manage your call records</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Total Calls</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {mockCalls.length}
              </div>
              <p className="text-xs text-blue-600 font-medium">All calls made</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-green-500 hover:border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Connected Calls</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {mockCalls.filter(call => call.duration > 0).length}
              </div>
              <p className="text-xs text-green-600 font-medium">Successfully connected</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 hover:border-l-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Total Duration</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {Math.floor(getTotalDuration() / 60)}m
              </div>
              <p className="text-xs text-purple-600 font-medium">Total talk time</p>
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
                            <button 
                              onClick={() => handleViewCall(call)}
                              className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleCallAgain(call)}
                              className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                            >
                              Call Again
                            </button>
                            <button 
                              onClick={() => handleEditCall(call)}
                              className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
                            >
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

        {/* Call Control Panel */}
        <CallControlPanel
          isVisible={showCallPanel}
          onClose={handleCloseCallPanel}
          selectedLead={selectedCallForCall}
        />

        {/* Call Details Modal */}
        {showCallDetails && selectedCallForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Blurry Background Overlay */}
            <div 
              className="absolute inset-0 bg-white/20 backdrop-blur-md animate-in fade-in duration-300"
              onClick={handleCloseCallDetails}
            />
            
            {/* Modal */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] overflow-hidden border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col">
              {/* Header - Fixed */}
              <div className="p-4 pb-3 border-b border-gray-200/50 bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Call Details</h2>
                      <p className="text-gray-600">{selectedCallForDetails.contactName}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseCallDetails}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Call Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Contact Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {selectedCallForDetails.contactName}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone Number
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {selectedCallForDetails.contactPhone}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Company
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {selectedCallForDetails.contactCompany}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Call Date
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {formatDate(selectedCallForDetails.callDate)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Duration
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {formatDuration(selectedCallForDetails.duration)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Outcome
                      </label>
                      <div className="mt-1">
                        <Badge variant={outcomeColors[selectedCallForDetails.outcome as keyof typeof outcomeColors]}>
                          {selectedCallForDetails.outcome.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
                    <label className="text-sm font-medium text-gray-500 flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Call Notes
                    </label>
                    <div className="p-2 bg-white/50 rounded border border-gray-200/30">
                      <p className="text-gray-900">
                        {selectedCallForDetails.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="p-4 pt-3 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleCloseCallDetails}
                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseCallDetails();
                      handleCallAgain(selectedCallForDetails);
                    }}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Call Modal */}
        {showEditModal && selectedCallForEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Blurry Background Overlay */}
            <div 
              className="absolute inset-0 bg-white/20 backdrop-blur-md animate-in fade-in duration-300"
              onClick={handleCloseEditModal}
            />
            
            {/* Modal */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-2xl w-full h-[80vh] overflow-hidden border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col">
              {/* Header - Fixed */}
              <div className="p-4 pb-3 border-b border-gray-200/50 bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Edit Call</h2>
                      <p className="text-gray-600">{selectedCallForEdit.contactName}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseEditModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Outcome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call Outcome
                    </label>
                    <select
                      defaultValue={selectedCallForEdit.outcome}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="interested">Interested</option>
                      <option value="not-interested">Not Interested</option>
                      <option value="callback">Callback</option>
                      <option value="no-answer">No Answer</option>
                      <option value="busy">Busy</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (seconds)
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedCallForEdit.duration}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call Notes
                    </label>
                    <textarea
                      defaultValue={selectedCallForEdit.notes}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Add or update call notes..."
                    />
                  </div>
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="p-4 pt-3 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleCloseEditModal}
                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSaveCall(selectedCallForEdit)}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Container */}
        <NotificationContainer 
          notifications={notifications} 
          onRemove={removeNotification} 
        />
      </div>
    </DashboardLayout>
  );
}
