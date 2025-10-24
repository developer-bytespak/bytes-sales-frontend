"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCSVModal } from "@/components/modals/upload-csv-modal";
import { CallControlPanel } from "@/components/call/call-control-panel";
import { EmailComposer } from "@/components/email/email-composer";

// Mock data - in real app this would come from API
const mockLeads = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Inc",
    status: "new",
    lastContacted: null,
    notes: ""
  },
  {
    id: "2",
    name: "Mike Chen",
    phone: "+1 (555) 234-5678",
    email: "mike.chen@startup.io",
    company: "Startup.io",
    status: "contacted",
    lastContacted: "2024-01-15",
    notes: "Interested in our enterprise plan"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    phone: "+1 (555) 345-6789",
    email: "emily@bigcorp.com",
    company: "BigCorp",
    status: "qualified",
    lastContacted: "2024-01-14",
    notes: "Budget approved, decision maker"
  },
  {
    id: "4",
    name: "David Kim",
    phone: "+1 (555) 456-7890",
    email: "david.kim@innovate.com",
    company: "Innovate Solutions",
    status: "converted",
    lastContacted: "2024-01-13",
    notes: "Deal closed - $50k contract"
  }
];

const statusColors = {
  new: "default",
  contacted: "info",
  qualified: "warning",
  converted: "success"
} as const;

export default function LeadsPage() {
  const router = useRouter();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCallPanel, setShowCallPanel] = useState(false);
  const [selectedLeadForCall, setSelectedLeadForCall] = useState<any>(null);
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [selectedLeadForEmail, setSelectedLeadForEmail] = useState<any>(null);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesCompany = companyFilter === "" || lead.company.toLowerCase().includes(companyFilter.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter !== "all" && lead.lastContacted) {
      const contactDate = new Date(lead.lastContacted);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - contactDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "today" && daysDiff > 0) matchesDate = false;
      if (dateFilter === "week" && daysDiff > 7) matchesDate = false;
      if (dateFilter === "month" && daysDiff > 30) matchesDate = false;
    }
    
    return matchesSearch && matchesStatus && matchesCompany && matchesDate;
  });

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === filteredLeads.length 
        ? [] 
        : filteredLeads.map(lead => lead.id)
    );
  };

  const handleStartCalling = () => {
    if (selectedLeads.length === 0) return;
    // Start with the first selected lead
    const firstLead = mockLeads.find(lead => lead.id === selectedLeads[0]);
    if (firstLead) {
      setSelectedLeadForCall(firstLead);
      setShowCallPanel(true);
    }
  };

  const handleCallLead = (lead: any) => {
    setSelectedLeadForCall(lead);
    setShowCallPanel(true);
  };

  const handleCloseCallPanel = () => {
    setShowCallPanel(false);
    setSelectedLeadForCall(null);
  };

  const handleEmailLead = (lead: any) => {
    setSelectedLeadForEmail(lead);
    setShowEmailComposer(true);
  };

  const handleCloseEmailComposer = () => {
    setShowEmailComposer(false);
    setSelectedLeadForEmail(null);
  };

  const handleSendEmail = (emailData: any) => {
    console.log("Sending email:", emailData);
    // TODO: Implement actual email sending logic
    alert(`Email sent to ${emailData.to}! This would normally send via Gmail API.`);
  };

  const handleCSVUpload = (file: File) => {
    console.log("Uploading CSV file:", file.name);
    // TODO: Implement actual upload logic
    // For now, just show success message
    alert(`Successfully uploaded ${file.name}! This would normally add new leads to the table.`);
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-2">Manage your contact list and start calling campaigns</p>
        </div>

        {/* Toolbar */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Upload Button */}
                <Button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload CSV
                </Button>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                </select>

                {/* Company Filter */}
                <input
                  type="text"
                  placeholder="Filter by company..."
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                {/* Date Filter */}
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Contacted Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <div className="flex gap-2">
                {/* View History Button */}
                <Button 
                  variant="outline"
                  onClick={() => router.push("/dashboard/uploads")}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View History
                </Button>

                {/* Bulk Actions */}
                {selectedLeads.length > 0 && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleStartCalling}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Start Calling ({selectedLeads.length})
                    </Button>
                    <Button variant="outline">
                      Export Selected
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardContent className="p-0">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by uploading a CSV file with your contacts.</p>
                <div className="mt-6">
                  <Button 
                    onClick={() => setShowUploadModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload CSV
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Contacted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedLeads.includes(lead.id)}
                            onChange={() => handleSelectLead(lead.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lead.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lead.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={statusColors[lead.status as keyof typeof statusColors]}>
                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.lastContacted ? new Date(lead.lastContacted).toLocaleDateString() : "Never"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleCallLead(lead)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Call
                            </button>
                            <button 
                              onClick={() => handleEmailLead(lead)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Email
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              View
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

            {/* CSV Upload Modal */}
            <UploadCSVModal
              isOpen={showUploadModal}
              onClose={() => setShowUploadModal(false)}
              onUpload={handleCSVUpload}
            />

            {/* Call Control Panel */}
            <CallControlPanel
              isVisible={showCallPanel}
              onClose={handleCloseCallPanel}
              selectedLead={selectedLeadForCall}
            />

            {/* Email Composer */}
            <EmailComposer
              isOpen={showEmailComposer}
              onClose={handleCloseEmailComposer}
              selectedLead={selectedLeadForEmail}
              onSend={handleSendEmail}
            />
          </div>
        </DashboardLayout>
      );
    }
