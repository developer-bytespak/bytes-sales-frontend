"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactCard } from "@/components/crm/contact-card";

// Mock data - in real app this would come from API
const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc",
    title: "VP of Engineering",
    status: "customer",
    lastContact: "2024-01-15T14:30:00Z",
    totalDeals: 3,
    totalValue: 125000,
    tags: ["enterprise", "decision-maker", "technical"],
    notes: "Key decision maker for enterprise solutions. Very interested in our platform. Has budget approval for Q1."
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@startupxyz.com",
    phone: "+1 (555) 987-6543",
    company: "StartupXYZ",
    title: "Founder & CEO",
    status: "lead",
    lastContact: "2024-01-15T11:15:00Z",
    totalDeals: 1,
    totalValue: 12000,
    tags: ["startup", "founder", "price-sensitive"],
    notes: "Early stage startup. Very interested but budget constrained. Negotiating pricing."
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@marketingpro.com",
    phone: "+1 (555) 456-7890",
    company: "Marketing Pro",
    title: "Marketing Director",
    status: "active",
    lastContact: "2024-01-14T16:45:00Z",
    totalDeals: 0,
    totalValue: 0,
    tags: ["marketing", "qualified", "demo-scheduled"],
    notes: "Qualified lead from website. Scheduled demo for next week. Very interested in our marketing automation features."
  },
  {
    id: "4",
    name: "John Smith",
    email: "john.smith@businesssolutions.com",
    phone: "+1 (555) 321-0987",
    company: "Business Solutions",
    title: "Operations Manager",
    status: "customer",
    lastContact: "2024-01-14T09:20:00Z",
    totalDeals: 2,
    totalValue: 35000,
    tags: ["operations", "enterprise", "satisfied"],
    notes: "Existing customer. Very satisfied with our service. Potential for upsell opportunities."
  },
  {
    id: "5",
    name: "Lisa Wilson",
    email: "lisa.wilson@creativeagency.com",
    phone: "+1 (555) 654-3210",
    company: "Creative Agency",
    title: "Creative Director",
    status: "inactive",
    lastContact: "2024-01-13T15:10:00Z",
    totalDeals: 1,
    totalValue: 8000,
    tags: ["creative", "agency", "price-sensitive"],
    notes: "Lost to competitor due to pricing. May reconsider in 6 months."
  },
  {
    id: "6",
    name: "David Rodriguez",
    email: "david.rodriguez@techstartup.com",
    phone: "+1 (555) 789-0123",
    company: "TechStartup",
    title: "CTO",
    status: "lead",
    lastContact: "2024-01-12T10:30:00Z",
    totalDeals: 0,
    totalValue: 0,
    tags: ["startup", "technical", "early-stage"],
    notes: "Technical founder. Very interested in our developer tools. Early stage but high potential."
  }
];

const statusColors = {
  active: "success",
  inactive: "default",
  lead: "info",
  customer: "warning"
} as const;

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    const matchesCompany = companyFilter === "" || contact.company.toLowerCase().includes(companyFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesCompany;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getContactStats = () => {
    const total = mockContacts.length;
    const customers = mockContacts.filter(c => c.status === "customer").length;
    const leads = mockContacts.filter(c => c.status === "lead").length;
    const active = mockContacts.filter(c => c.status === "active").length;
    const totalValue = mockContacts.reduce((sum, c) => sum + c.totalValue, 0);
    
    return {
      total,
      customers,
      leads,
      active,
      totalValue,
      avgValue: total > 0 ? Math.round(totalValue / total) : 0
    };
  };

  const stats = getContactStats();

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId) 
        : [...prev, contactId]
    );
  };

  const handleSelectAllContacts = () => {
    setSelectedContacts(prev => 
      prev.length === filteredContacts.length 
        ? [] 
        : filteredContacts.map(contact => contact.id)
    );
  };

  const handleEditContact = (contact: any) => {
    console.log("Edit contact:", contact);
    // TODO: Open edit modal
  };

  const handleDeleteContact = (contactId: string) => {
    console.log("Delete contact:", contactId);
    // TODO: Implement delete functionality
  };

  const handleCallContact = (contact: any) => {
    console.log("Call contact:", contact);
    // TODO: Open call control panel
  };

  const handleEmailContact = (contact: any) => {
    console.log("Email contact:", contact);
    // TODO: Open email composer
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-2">Manage your CRM contacts and relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Contacts</p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Customers</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.customers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Leads</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.leads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12h-4m-7 0h-4L3 12c.512-.598 1.482-1 2.592-1H12zm0 0v9m-8.28-8.28a4 4 0 010 11.313M20.28 1.72a4 4 0 010 11.313" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Value</p>
                  <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search contacts..."
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="lead">Lead</option>
                  <option value="customer">Customer</option>
                </select>

                {/* Company Filter */}
                <input
                  type="text"
                  placeholder="Filter by company..."
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    List
                  </button>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0-6H6" />
                  </svg>
                  New Contact
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Bulk Actions */}
        {selectedContacts.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Selected
                    </Button>
                    <Button size="sm" variant="outline">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Selected
                    </Button>
                    <Button size="sm" variant="outline">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Add Tags
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedContacts([])}
                  variant="outline"
                  size="sm"
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contacts Display */}
        {filteredContacts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or add a new contact.</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0-6H6" />
              </svg>
              Add New Contact
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="relative group">
                <input
                  type="checkbox"
                  className="absolute top-4 left-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleSelectContact(contact.id)}
                />
                <ContactCard
                  contact={contact}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                  onCall={handleCallContact}
                  onEmail={handleEmailContact}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                          onChange={handleSelectAllContacts}
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleSelectContact(contact.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {contact.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-gray-900">{contact.name}</div>
                              <div className="text-sm text-gray-500">{contact.title}</div>
                              <div className="text-sm text-gray-500 truncate">{contact.email}</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {contact.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {tag}
                                  </span>
                                ))}
                                {contact.tags.length > 2 && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    +{contact.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{contact.company}</div>
                          <div className="text-sm text-gray-500">{contact.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={statusColors[contact.status]} className="font-medium">
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {formatCurrency(contact.totalValue)}
                            </div>
                            <div className="text-xs text-gray-500">{contact.totalDeals} deals</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(contact.lastContact).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.ceil((new Date().getTime() - new Date(contact.lastContact).getTime()) / (1000 * 60 * 60 * 24))} days ago
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => handleCallContact(contact)}
                              className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                            >
                              Call
                            </button>
                            <button 
                              onClick={() => handleEmailContact(contact)}
                              className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                              Email
                            </button>
                            <button 
                              onClick={() => handleEditContact(contact)}
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
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
