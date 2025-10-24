"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLead?: {
    id: string;
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  onSend: (emailData: any) => void;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
}

// Mock templates - in real app this would come from API
const mockTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Initial Follow-up",
    subject: "Following up on our conversation - {{company_name}}",
    body: "Hi {{contact_name}},\n\nThank you for taking the time to speak with me today about {{company_name}}'s needs. I wanted to follow up on our discussion and provide you with the information we discussed.\n\nAs mentioned, our solution can help {{company_name}} achieve:\n- {{benefit_1}}\n- {{benefit_2}}\n- {{benefit_3}}\n\nI'd love to schedule a brief demo to show you exactly how this works. Would you be available for a 15-minute call this week?\n\nBest regards,\n{{agent_name}}",
    category: "follow-up"
  },
  {
    id: "2",
    name: "Demo Invitation",
    subject: "Demo Invitation - {{company_name}}",
    body: "Hi {{contact_name}},\n\nI hope this email finds you well. I wanted to reach out because I believe our solution could be a perfect fit for {{company_name}}.\n\nBased on what you shared about your current challenges, I think you'd find our platform particularly valuable for:\n- Streamlining your {{process_name}}\n- Reducing {{pain_point}} by up to 40%\n- Improving {{outcome_metric}}\n\nI'd love to show you a quick 20-minute demo of how this works in practice. Are you available for a brief call this week?\n\nBest regards,\n{{agent_name}}",
    category: "demo"
  },
  {
    id: "3",
    name: "Pricing Follow-up",
    subject: "Pricing Information - {{company_name}}",
    body: "Hi {{contact_name}},\n\nThank you for your interest in our solution. As promised, here are the pricing details we discussed:\n\n**Pricing Options:**\n- Starter Plan: ${{starter_price}}/month\n- Professional Plan: ${{pro_price}}/month\n- Enterprise Plan: Custom pricing\n\n**What's included:**\n- {{feature_1}}\n- {{feature_2}}\n- {{feature_3}}\n\nI'm confident this investment will pay for itself within the first quarter through {{roi_benefit}}.\n\nWould you like to schedule a call to discuss which plan works best for {{company_name}}?\n\nBest regards,\n{{agent_name}}",
    category: "pricing"
  }
];

export function EmailComposer({ isOpen, onClose, selectedLead, onSend }: EmailComposerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // Initialize with selected lead data
  useEffect(() => {
    if (selectedLead) {
      setTo(selectedLead.email);
    }
  }, [selectedLead]);

  // Apply template when selected
  useEffect(() => {
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      setBody(selectedTemplate.body);
      setShowTemplateSelector(false);
    }
  }, [selectedTemplate]);

  const handleClose = () => {
    setSelectedTemplate(null);
    setSubject("");
    setBody("");
    setTo("");
    setCc("");
    setBcc("");
    setIsSending(false);
    setShowTemplateSelector(false);
    onClose();
  };

  const handleSend = async () => {
    if (!to || !subject || !body) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSending(true);
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const emailData = {
      to,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject,
      body,
      templateId: selectedTemplate?.id,
      leadId: selectedLead?.id
    };

    onSend(emailData);
    handleClose();
  };

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
  };

  const replaceVariables = (text: string) => {
    if (!selectedLead) return text;
    
    return text
      .replace(/\{\{contact_name\}\}/g, selectedLead.name)
      .replace(/\{\{company_name\}\}/g, selectedLead.company)
      .replace(/\{\{agent_name\}\}/g, "Your Name") // This would come from user profile
      .replace(/\{\{benefit_1\}\}/g, "Increased efficiency")
      .replace(/\{\{benefit_2\}\}/g, "Cost savings")
      .replace(/\{\{benefit_3\}\}/g, "Better results")
      .replace(/\{\{process_name\}\}/g, "workflow")
      .replace(/\{\{pain_point\}\}/g, "manual processes")
      .replace(/\{\{outcome_metric\}\}/g, "productivity")
      .replace(/\{\{starter_price\}\}/g, "99")
      .replace(/\{\{pro_price\}\}/g, "199")
      .replace(/\{\{feature_1\}\}/g, "Advanced analytics")
      .replace(/\{\{feature_2\}\}/g, "Team collaboration")
      .replace(/\{\{feature_3\}\}/g, "24/7 support")
      .replace(/\{\{roi_benefit\}\}/g, "increased productivity");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-900">Compose Email</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                  variant="outline"
                  size="sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Templates
                </Button>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Template Selector */}
            {showTemplateSelector && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Choose a Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <Badge variant="info">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{template.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Template Info */}
            {selectedTemplate && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-blue-700">
                  Using template: <strong>{selectedTemplate.name}</strong>
                </span>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Recipients */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CC
                  </label>
                  <input
                    type="email"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="cc@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BCC
                  </label>
                  <input
                    type="email"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="bcc@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email subject"
              />
              {selectedTemplate && (
                <p className="text-xs text-gray-500 mt-1">
                  Preview: {replaceVariables(subject)}
                </p>
              )}
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message here..."
              />
              {selectedTemplate && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded">
                  <p className="text-xs font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="text-xs text-gray-600 whitespace-pre-wrap max-h-32 overflow-y-auto">
                    {replaceVariables(body)}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleClose}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Save as draft functionality
                    console.log("Save as draft");
                  }}
                  variant="outline"
                >
                  Save Draft
                </Button>
              </div>
              
              <Button
                onClick={handleSend}
                disabled={isSending || !to || !subject || !body}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
