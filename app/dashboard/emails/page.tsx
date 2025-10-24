"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - in real app this would come from API
const mockEmails = [
  {
    id: "1",
    recipientName: "Sarah Johnson",
    recipientEmail: "sarah.johnson@techcorp.com",
    recipientCompany: "TechCorp Inc",
    subject: "Following up on our conversation - TechCorp Inc",
    body: "Hi Sarah,\n\nThank you for taking the time to speak with me today about TechCorp Inc's needs...",
    templateName: "Initial Follow-up",
    status: "sent",
    sentDate: "2024-01-15T14:30:00Z",
    openedDate: "2024-01-15T16:45:00Z",
    clickedDate: null,
    replyDate: null,
    leadId: "1"
  },
  {
    id: "2",
    recipientName: "Mike Chen",
    recipientEmail: "mike.chen@startupxyz.com",
    recipientCompany: "StartupXYZ",
    subject: "Demo Invitation - StartupXYZ",
    body: "Hi Mike,\n\nI hope this email finds you well. I wanted to reach out because I believe our solution could be a perfect fit for StartupXYZ...",
    templateName: "Demo Invitation",
    status: "sent",
    sentDate: "2024-01-15T11:15:00Z",
    openedDate: "2024-01-15T12:30:00Z",
    clickedDate: "2024-01-15T12:45:00Z",
    replyDate: "2024-01-15T13:20:00Z",
    leadId: "2"
  },
  {
    id: "3",
    recipientName: "Emily Davis",
    recipientEmail: "emily.davis@marketingpro.com",
    recipientCompany: "Marketing Pro",
    subject: "Pricing Information - Marketing Pro",
    body: "Hi Emily,\n\nThank you for your interest in our solution. As promised, here are the pricing details we discussed...",
    templateName: "Pricing Follow-up",
    status: "sent",
    sentDate: "2024-01-14T16:45:00Z",
    openedDate: null,
    clickedDate: null,
    replyDate: null,
    leadId: "3"
  },
  {
    id: "4",
    recipientName: "John Smith",
    recipientEmail: "john.smith@businesssolutions.com",
    recipientCompany: "Business Solutions",
    subject: "Addressing your concerns - Business Solutions",
    body: "Hi John,\n\nI understand your concerns about budget constraints. Let me address this directly...",
    templateName: "Objection Handling",
    status: "sent",
    sentDate: "2024-01-14T09:20:00Z",
    openedDate: "2024-01-14T10:15:00Z",
    clickedDate: null,
    replyDate: null,
    leadId: "4"
  },
  {
    id: "5",
    recipientName: "Lisa Wilson",
    recipientEmail: "lisa.wilson@creativeagency.com",
    recipientCompany: "Creative Agency",
    subject: "Next steps - Creative Agency",
    body: "Hi Lisa,\n\nI'm excited about the possibility of working with Creative Agency. Based on our conversation...",
    templateName: "Closing Follow-up",
    status: "sent",
    sentDate: "2024-01-13T15:10:00Z",
    openedDate: "2024-01-13T16:30:00Z",
    clickedDate: "2024-01-13T16:45:00Z",
    replyDate: "2024-01-13T17:20:00Z",
    leadId: "5"
  }
];

const statusColors = {
  sent: "success",
  delivered: "info",
  opened: "warning",
  clicked: "info",
  replied: "success",
  bounced: "error"
} as const;

export default function EmailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = email.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || email.status === statusFilter;
    const matchesTemplate = templateFilter === "all" || email.templateName === templateFilter;
    
    let matchesDate = true;
    if (dateFilter !== "all") {
      const sentDate = new Date(email.sentDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - sentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "today" && daysDiff > 0) matchesDate = false;
      if (dateFilter === "week" && daysDiff > 7) matchesDate = false;
      if (dateFilter === "month" && daysDiff > 30) matchesDate = false;
    }
    
    return matchesSearch && matchesStatus && matchesTemplate && matchesDate;
  });

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

  const getEmailStats = () => {
    const total = mockEmails.length;
    const opened = mockEmails.filter(e => e.openedDate).length;
    const clicked = mockEmails.filter(e => e.clickedDate).length;
    const replied = mockEmails.filter(e => e.replyDate).length;
    
    return {
      total,
      opened,
      clicked,
      replied,
      openRate: total > 0 ? Math.round((opened / total) * 100) : 0,
      clickRate: total > 0 ? Math.round((clicked / total) * 100) : 0,
      replyRate: total > 0 ? Math.round((replied / total) * 100) : 0
    };
  };

  const stats = getEmailStats();

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Email History</h1>
          <p className="text-gray-600 mt-2">Track and manage your email campaigns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Emails</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Open Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.openRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Click Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.clickRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Reply Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.replyRate}%</p>
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
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="delivered">Delivered</option>
                <option value="opened">Opened</option>
                <option value="clicked">Clicked</option>
                <option value="replied">Replied</option>
                <option value="bounced">Bounced</option>
              </select>

              {/* Template Filter */}
              <select
                value={templateFilter}
                onChange={(e) => setTemplateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Templates</option>
                <option value="Initial Follow-up">Initial Follow-up</option>
                <option value="Demo Invitation">Demo Invitation</option>
                <option value="Pricing Follow-up">Pricing Follow-up</option>
                <option value="Objection Handling">Objection Handling</option>
                <option value="Closing Follow-up">Closing Follow-up</option>
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

        {/* Emails Table */}
        <Card>
          <CardContent className="p-0">
            {filteredEmails.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No emails found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or start sending emails.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Template
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sent Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Engagement
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmails.map((email) => (
                      <tr key={email.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{email.recipientName}</div>
                            <div className="text-sm text-gray-500">{email.recipientEmail}</div>
                            <div className="text-xs text-gray-400">{email.recipientCompany}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate" title={email.subject}>
                            {email.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="info">{email.templateName}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={statusColors[email.status as keyof typeof statusColors]}>
                            {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(email.sentDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2 text-xs">
                            {email.openedDate && (
                              <span className="text-green-600">✓ Opened</span>
                            )}
                            {email.clickedDate && (
                              <span className="text-blue-600">🔗 Clicked</span>
                            )}
                            {email.replyDate && (
                              <span className="text-purple-600">💬 Replied</span>
                            )}
                            {!email.openedDate && !email.clickedDate && !email.replyDate && (
                              <span className="text-gray-400">No engagement</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Reply
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Forward
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
