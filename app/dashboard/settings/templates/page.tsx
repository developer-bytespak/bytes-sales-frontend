"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - in real app this would come from API
const mockTemplates = [
  {
    id: "1",
    name: "Initial Follow-up",
    subject: "Following up on our conversation - {{company_name}}",
    body: "Hi {{contact_name}},\n\nThank you for taking the time to speak with me today about {{company_name}}'s needs. I wanted to follow up on our discussion and provide you with the information we discussed.\n\nAs mentioned, our solution can help {{company_name}} achieve:\n- {{benefit_1}}\n- {{benefit_2}}\n- {{benefit_3}}\n\nI'd love to schedule a brief demo to show you exactly how this works. Would you be available for a 15-minute call this week?\n\nBest regards,\n{{agent_name}}",
    category: "follow-up",
    isActive: true,
    createdAt: "2024-01-10T09:00:00Z",
    usageCount: 45
  },
  {
    id: "2",
    name: "Demo Invitation",
    subject: "Demo Invitation - {{company_name}}",
    body: "Hi {{contact_name}},\n\nI hope this email finds you well. I wanted to reach out because I believe our solution could be a perfect fit for {{company_name}}.\n\nBased on what you shared about your current challenges, I think you'd find our platform particularly valuable for:\n- Streamlining your {{process_name}}\n- Reducing {{pain_point}} by up to 40%\n- Improving {{outcome_metric}}\n\nI'd love to show you a quick 20-minute demo of how this works in practice. Are you available for a brief call this week?\n\nBest regards,\n{{agent_name}}",
    category: "demo",
    isActive: true,
    createdAt: "2024-01-08T14:30:00Z",
    usageCount: 23
  },
  {
    id: "3",
    name: "Pricing Follow-up",
    subject: "Pricing Information - {{company_name}}",
    body: "Hi {{contact_name}},\n\nThank you for your interest in our solution. As promised, here are the pricing details we discussed:\n\n**Pricing Options:**\n- Starter Plan: ${{starter_price}}/month\n- Professional Plan: ${{pro_price}}/month\n- Enterprise Plan: Custom pricing\n\n**What's included:**\n- {{feature_1}}\n- {{feature_2}}\n- {{feature_3}}\n\nI'm confident this investment will pay for itself within the first quarter through {{roi_benefit}}.\n\nWould you like to schedule a call to discuss which plan works best for {{company_name}}?\n\nBest regards,\n{{agent_name}}",
    category: "pricing",
    isActive: true,
    createdAt: "2024-01-05T11:15:00Z",
    usageCount: 18
  },
  {
    id: "4",
    name: "Objection Handling",
    subject: "Addressing your concerns - {{company_name}}",
    body: "Hi {{contact_name}},\n\nI understand your concerns about {{objection}}. Let me address this directly:\n\n**Your concern:** {{objection}}\n**Our solution:** {{solution_response}}\n\nI've helped many companies in similar situations, and here's what they've found:\n- {{testimonial_1}}\n- {{testimonial_2}}\n\nWould you be open to a brief call where I can show you exactly how this works for companies like {{company_name}}?\n\nBest regards,\n{{agent_name}}",
    category: "objection",
    isActive: true,
    createdAt: "2024-01-03T16:45:00Z",
    usageCount: 12
  },
  {
    id: "5",
    name: "Closing Follow-up",
    subject: "Next steps - {{company_name}}",
    body: "Hi {{contact_name}},\n\nI'm excited about the possibility of working with {{company_name}}. Based on our conversation, I believe our solution is exactly what you need to achieve {{goal}}.\n\n**Next Steps:**\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\nI'm confident this partnership will deliver significant value for {{company_name}}. When would be a good time to move forward?\n\nBest regards,\n{{agent_name}}",
    category: "closing",
    isActive: false,
    createdAt: "2024-01-01T10:00:00Z",
    usageCount: 8
  }
];

const categoryColors = {
  "follow-up": "blue",
  "demo": "green",
  "pricing": "yellow",
  "objection": "red",
  "closing": "purple"
} as const;

export default function EmailTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || 
                        (statusFilter === "active" && template.isActive) ||
                        (statusFilter === "inactive" && !template.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setShowTemplateModal(true);
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const handleToggleTemplate = (templateId: string) => {
    // TODO: Implement toggle functionality
    console.log("Toggle template:", templateId);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete template:", templateId);
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-600 mt-2">Create and manage email templates for your sales campaigns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Templates</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockTemplates.length}</p>
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
                  <p className="text-sm font-medium text-gray-500">Active Templates</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockTemplates.filter(t => t.isActive).length}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Usage</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockTemplates.reduce((sum, t) => sum + t.usageCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Categories</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {new Set(mockTemplates.map(t => t.category)).size}
                  </p>
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
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="demo">Demo</option>
                  <option value="pricing">Pricing</option>
                  <option value="objection">Objection</option>
                  <option value="closing">Closing</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <Button 
                onClick={handleCreateTemplate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0-6H6" />
                </svg>
                Create Template
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {template.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={categoryColors[template.category as keyof typeof categoryColors]}>
                        {template.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      <Badge variant={template.isActive ? "success" : "default"}>
                        {template.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="p-1 text-gray-400 hover:text-blue-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleToggleTemplate(template.id)}
                      className="p-1 text-gray-400 hover:text-yellow-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.subject}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {template.body.substring(0, 150)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Used {template.usageCount} times</span>
                    <span>{formatDate(template.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No templates found</h3>
            <p className="mt-1 text-sm text-gray-500">Create your first email template to get started.</p>
            <div className="mt-6">
              <Button 
                onClick={handleCreateTemplate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0-6H6" />
                </svg>
                Create Template
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
