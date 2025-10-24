"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - in real app this would come from API
const mockDeals = [
  {
    id: "1",
    title: "TechCorp Enterprise License",
    company: "TechCorp Inc",
    contact: "Sarah Johnson",
    contactEmail: "sarah.johnson@techcorp.com",
    value: 50000,
    stage: "proposal",
    probability: 75,
    closeDate: "2024-02-15",
    createdAt: "2024-01-10T09:00:00Z",
    lastActivity: "2024-01-15T14:30:00Z",
    source: "Cold Call",
    owner: "Alex Smith",
    notes: "Very interested in our enterprise solution. Demo went well, waiting for budget approval.",
    tags: ["enterprise", "high-value", "hot-lead"]
  },
  {
    id: "2",
    title: "StartupXYZ SaaS Subscription",
    company: "StartupXYZ",
    contact: "Mike Chen",
    contactEmail: "mike.chen@startupxyz.com",
    value: 12000,
    stage: "negotiation",
    probability: 60,
    closeDate: "2024-02-01",
    createdAt: "2024-01-08T11:15:00Z",
    lastActivity: "2024-01-14T16:45:00Z",
    source: "Referral",
    owner: "Sarah Wilson",
    notes: "Price negotiations ongoing. They want a 20% discount but we can offer 15%.",
    tags: ["saas", "startup", "negotiation"]
  },
  {
    id: "3",
    title: "Marketing Pro Campaign Management",
    company: "Marketing Pro",
    contact: "Emily Davis",
    contactEmail: "emily.davis@marketingpro.com",
    value: 25000,
    stage: "qualified",
    probability: 40,
    closeDate: "2024-03-01",
    createdAt: "2024-01-05T14:20:00Z",
    lastActivity: "2024-01-12T10:15:00Z",
    source: "Website",
    owner: "John Doe",
    notes: "Initial qualification complete. Need to schedule technical demo.",
    tags: ["marketing", "qualified", "demo-needed"]
  },
  {
    id: "4",
    title: "Business Solutions Integration",
    company: "Business Solutions",
    contact: "John Smith",
    contactEmail: "john.smith@businesssolutions.com",
    value: 35000,
    stage: "closed-won",
    probability: 100,
    closeDate: "2024-01-20",
    createdAt: "2023-12-15T09:30:00Z",
    lastActivity: "2024-01-20T15:00:00Z",
    source: "Cold Call",
    owner: "Alex Smith",
    notes: "Deal closed! Contract signed, implementation starting next week.",
    tags: ["closed", "enterprise", "success"]
  },
  {
    id: "5",
    title: "Creative Agency Design Tools",
    company: "Creative Agency",
    contact: "Lisa Wilson",
    contactEmail: "lisa.wilson@creativeagency.com",
    value: 8000,
    stage: "closed-lost",
    probability: 0,
    closeDate: "2024-01-18",
    createdAt: "2024-01-02T16:45:00Z",
    lastActivity: "2024-01-18T11:30:00Z",
    source: "Email Campaign",
    owner: "Sarah Wilson",
    notes: "Lost to competitor. They went with a cheaper alternative.",
    tags: ["lost", "competitor", "price-sensitive"]
  }
];

const stageColors = {
  "lead": "default",
  "qualified": "info",
  "proposal": "warning",
  "negotiation": "blue",
  "closed-won": "success",
  "closed-lost": "error"
} as const;

const stageOrder = ["lead", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"];

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [valueFilter, setValueFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline");

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || deal.stage === stageFilter;
    const matchesOwner = ownerFilter === "all" || deal.owner === ownerFilter;
    
    let matchesValue = true;
    if (valueFilter !== "all") {
      if (valueFilter === "small" && deal.value >= 10000) matchesValue = false;
      if (valueFilter === "medium" && (deal.value < 10000 || deal.value >= 50000)) matchesValue = false;
      if (valueFilter === "large" && deal.value < 50000) matchesValue = false;
    }
    
    return matchesSearch && matchesStage && matchesOwner && matchesValue;
  });

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

  const getDealStats = () => {
    const total = mockDeals.length;
    const won = mockDeals.filter(d => d.stage === "closed-won").length;
    const lost = mockDeals.filter(d => d.stage === "closed-lost").length;
    const active = total - won - lost;
    const totalValue = mockDeals.reduce((sum, d) => sum + d.value, 0);
    const wonValue = mockDeals.filter(d => d.stage === "closed-won").reduce((sum, d) => sum + d.value, 0);
    
    return {
      total,
      active,
      won,
      lost,
      totalValue,
      wonValue,
      winRate: total > 0 ? Math.round((won / total) * 100) : 0,
      avgDealSize: total > 0 ? Math.round(totalValue / total) : 0
    };
  };

  const stats = getDealStats();

  const getDealsByStage = () => {
    const dealsByStage: { [key: string]: any[] } = {};
    stageOrder.forEach(stage => {
      dealsByStage[stage] = filteredDeals.filter(deal => deal.stage === stage);
    });
    return dealsByStage;
  };

  const dealsByStage = getDealsByStage();

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Deals Pipeline</h1>
          <p className="text-gray-600 mt-2 text-base">Manage your sales pipeline and track deal progress</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
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
                {stats.total}
              </div>
              <p className="text-xs text-blue-600 font-medium">All deals</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-green-500 hover:border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Won Deals</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {stats.won}
              </div>
              <p className="text-xs text-green-600 font-medium">Closed won</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 hover:border-l-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Total Value</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {formatCurrency(stats.totalValue)}
              </div>
              <p className="text-xs text-purple-600 font-medium">Pipeline value</p>
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
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Stage Filter */}
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Stages</option>
                <option value="lead">Lead</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed-won">Closed Won</option>
                <option value="closed-lost">Closed Lost</option>
              </select>

              {/* Owner Filter */}
              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Owners</option>
                <option value="Alex Smith">Alex Smith</option>
                <option value="Sarah Wilson">Sarah Wilson</option>
                <option value="John Doe">John Doe</option>
              </select>

              {/* Value Filter */}
              <select
                value={valueFilter}
                onChange={(e) => setValueFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Values</option>
                <option value="small">Small (&lt; $10k)</option>
                <option value="medium">Medium ($10k - $50k)</option>
                <option value="large">Large (&gt; $50k)</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("pipeline")}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === "pipeline"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Pipeline
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
                New Deal
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Pipeline View */}
        {viewMode === "pipeline" && (
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max">
              {stageOrder.map((stage) => (
                <div key={stage} className="flex-shrink-0 w-80">
                  {/* Stage Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 capitalize text-lg">
                        {stage.replace('-', ' ')}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant={stageColors[stage as keyof typeof stageColors]} className="text-xs">
                          {dealsByStage[stage].length}
                        </Badge>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {formatCurrency(
                          dealsByStage[stage].reduce((sum, deal) => sum + deal.value, 0)
                        )}
                      </span>
                      <span className="text-xs text-gray-500">
                        {dealsByStage[stage].length} deal{dealsByStage[stage].length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  {/* Deal Cards */}
                  <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {dealsByStage[stage].map((deal) => (
                      <Card key={deal.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-green-500">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Deal Title and Company */}
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm leading-tight">{deal.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{deal.company}</p>
                            </div>
                            
                            {/* Value and Probability */}
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-lg text-gray-900">
                                {formatCurrency(deal.value)}
                              </span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${deal.probability}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium text-gray-600">
                                  {deal.probability}%
                                </span>
                              </div>
                            </div>
                            
                            {/* Owner and Close Date */}
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-700">
                                    {deal.owner.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span className="text-gray-600">{deal.owner}</span>
                              </div>
                              <span className="text-gray-500">{formatDate(deal.closeDate)}</span>
                            </div>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {deal.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="default" className="text-xs px-2 py-1">
                                  {tag}
                                </Badge>
                              ))}
                              {deal.tags.length > 2 && (
                                <Badge variant="default" className="text-xs px-2 py-1">
                                  +{deal.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* Empty State */}
                    {dealsByStage[stage].length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="text-sm">No deals in this stage</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <Card className="shadow-sm">
            <CardContent className="p-0">
              {filteredDeals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or create a new deal.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0-6H6" />
                    </svg>
                    Create New Deal
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Deal
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Stage
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Owner
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Close Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDeals.map((deal) => (
                        <tr key={deal.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {deal.title.charAt(0)}
                                  </span>
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900 truncate">{deal.title}</div>
                                <div className="text-sm text-gray-500 truncate">{deal.company}</div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {deal.tags.slice(0, 2).map((tag, index) => (
                                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                      {tag}
                                    </span>
                                  ))}
                                  {deal.tags.length > 2 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                      +{deal.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{deal.contact}</div>
                              <div className="text-sm text-gray-500">{deal.contactEmail}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {formatCurrency(deal.value)}
                              </div>
                              <div className="flex items-center justify-end space-x-2 mt-1">
                                <div className="w-12 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-blue-500 h-1.5 rounded-full" 
                                    style={{ width: `${deal.probability}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">{deal.probability}%</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={stageColors[deal.stage as keyof typeof stageColors]} className="font-medium">
                              {deal.stage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-700">
                                  {deal.owner.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{deal.owner}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(deal.closeDate)}</div>
                            <div className="text-xs text-gray-500">
                              {Math.ceil((new Date(deal.closeDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-1">
                              <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                                View
                              </button>
                              <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 transition-colors">
                                Edit
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-50 transition-colors">
                                Move
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
        )}
      </div>
    </DashboardLayout>
  );
}
