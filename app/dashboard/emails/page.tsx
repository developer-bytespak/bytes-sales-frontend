"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmailComposer } from "@/components/email/email-composer";
import { NotificationContainer, NotificationItem } from "@/components/ui/notification";

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
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [selectedEmailForComposer, setSelectedEmailForComposer] = useState<any>(null);
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const [selectedEmailForDetails, setSelectedEmailForDetails] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

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

  const addNotification = (notification: Omit<NotificationItem, "id">) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleViewEmail = (email: any) => {
    setSelectedEmailForDetails(email);
    setShowEmailDetails(true);
  };

  const handleCloseEmailDetails = () => {
    setShowEmailDetails(false);
    setSelectedEmailForDetails(null);
  };

  const handleReplyEmail = (email: any) => {
    setSelectedEmailForComposer({
      ...email,
      subject: `Re: ${email.subject}`,
      body: `\n\n--- Original Message ---\nFrom: ${email.recipientName} <${email.recipientEmail}>\nSubject: ${email.subject}\n\n${email.body}`
    });
    setShowEmailComposer(true);
  };

  const handleForwardEmail = (email: any) => {
    setSelectedEmailForComposer({
      ...email,
      subject: `Fwd: ${email.subject}`,
      body: `\n\n--- Forwarded Message ---\nFrom: ${email.recipientName} <${email.recipientEmail}>\nSubject: ${email.subject}\n\n${email.body}`
    });
    setShowEmailComposer(true);
  };

  const handleCloseEmailComposer = () => {
    setShowEmailComposer(false);
    setSelectedEmailForComposer(null);
  };

  const handleSendEmail = (emailData: any) => {
    console.log("Sending email:", emailData);
    addNotification({
      type: "success",
      title: "Email Sent",
      message: `Email sent to ${emailData.to}! This would normally send via Gmail API.`,
      duration: 4000
    });
    handleCloseEmailComposer();
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Email History</h1>
          <p className="text-gray-600 mt-2 text-base">Track and manage your email campaigns</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Total Emails</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {stats.total}
              </div>
              <p className="text-xs text-blue-600 font-medium">Emails sent</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-green-500 hover:border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Open Rate</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {stats.openRate}%
              </div>
              <p className="text-xs text-green-600 font-medium">Opened emails</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 hover:border-l-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Reply Rate</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {stats.replyRate}%
              </div>
              <p className="text-xs text-purple-600 font-medium">Replied emails</p>
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
                            <button 
                              onClick={() => handleViewEmail(email)}
                              className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleReplyEmail(email)}
                              className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                            >
                              Reply
                            </button>
                            <button 
                              onClick={() => handleForwardEmail(email)}
                              className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
                            >
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

        {/* Email Composer */}
        <EmailComposer
          isOpen={showEmailComposer}
          onClose={handleCloseEmailComposer}
          selectedLead={selectedEmailForComposer}
          onSend={handleSendEmail}
        />

        {/* Email Details Modal */}
        {showEmailDetails && selectedEmailForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Blurry Background Overlay */}
            <div 
              className="absolute inset-0 bg-white/20 backdrop-blur-md animate-in fade-in duration-300"
              onClick={handleCloseEmailDetails}
            />
            
            {/* Modal */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] overflow-hidden border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col">
              {/* Header - Fixed */}
              <div className="p-4 pb-3 border-b border-gray-200/50 bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Email Details</h2>
                      <p className="text-gray-600">{selectedEmailForDetails.subject}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseEmailDetails}
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
                  {/* Email Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Recipient
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {selectedEmailForDetails.recipientName}
                      </p>
                      <p className="text-sm text-gray-600">{selectedEmailForDetails.recipientEmail}</p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Company
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {selectedEmailForDetails.recipientCompany}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Template
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {selectedEmailForDetails.templateName}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Status
                      </label>
                      <div className="mt-1">
                        <Badge variant={statusColors[selectedEmailForDetails.status as keyof typeof statusColors]}>
                          {selectedEmailForDetails.status.charAt(0).toUpperCase() + selectedEmailForDetails.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sent Date
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {formatDate(selectedEmailForDetails.sentDate)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                      <label className="text-sm font-medium text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Engagement
                      </label>
                      <div className="mt-1 space-y-1">
                        {selectedEmailForDetails.openedDate && (
                          <span className="text-green-600 text-sm">✓ Opened</span>
                        )}
                        {selectedEmailForDetails.clickedDate && (
                          <span className="text-blue-600 text-sm">🔗 Clicked</span>
                        )}
                        {selectedEmailForDetails.replyDate && (
                          <span className="text-purple-600 text-sm">💬 Replied</span>
                        )}
                        {!selectedEmailForDetails.openedDate && !selectedEmailForDetails.clickedDate && !selectedEmailForDetails.replyDate && (
                          <span className="text-gray-400 text-sm">No engagement</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
                    <label className="text-sm font-medium text-gray-500 flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Subject
                    </label>
                    <div className="p-2 bg-white/50 rounded border border-gray-200/30">
                      <p className="text-gray-900 font-medium">
                        {selectedEmailForDetails.subject}
                      </p>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
                    <label className="text-sm font-medium text-gray-500 flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Email Content
                    </label>
                    <div className="p-3 bg-white/50 rounded border border-gray-200/30 max-h-60 overflow-y-auto">
                      <pre className="text-gray-900 whitespace-pre-wrap font-sans text-sm">
                        {selectedEmailForDetails.body}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="p-4 pt-3 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleCloseEmailDetails}
                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseEmailDetails();
                      handleReplyEmail(selectedEmailForDetails);
                    }}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Reply
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseEmailDetails();
                      handleForwardEmail(selectedEmailForDetails);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Forward
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
