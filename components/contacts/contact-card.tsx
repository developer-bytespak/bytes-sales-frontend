"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  status: string;
  totalValue: number;
  totalDeals: number;
  tags: string[];
}

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onCall: (contact: Contact) => void;
  onEmail: (contact: Contact) => void;
}

const statusColors = {
  "new": "default",
  "contacted": "info", 
  "qualified": "warning",
  "converted": "success"
} as const;

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export function ContactCard({ contact, onEdit, onDelete, onCall, onEmail }: ContactCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 group border-l-4 border-l-indigo-500 hover:border-l-green-500">
      <CardContent className="p-6">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{contact.name}</h3>
              <p className="text-sm text-gray-600 font-medium">{contact.title}</p>
            </div>
          </div>
          <Badge variant={statusColors[contact.status as keyof typeof statusColors]} className="font-semibold">
            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </Badge>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{contact.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="truncate">{contact.company}</span>
          </div>
        </div>

        {/* Value and Deals */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(contact.totalValue)}
              </div>
              <div className="text-xs text-gray-600">Total Value</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{contact.totalDeals}</div>
              <div className="text-xs text-gray-600">Deals</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {contact.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="default" className="text-xs px-2 py-1">
              {tag}
            </Badge>
          ))}
          {contact.tags.length > 3 && (
            <Badge variant="default" className="text-xs px-2 py-1">
              +{contact.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button 
            size="sm" 
            onClick={() => onCall(contact)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </Button>
          <Button 
            size="sm" 
            onClick={() => onEmail(contact)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </Button>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between pt-3 border-t border-gray-200">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onEdit(contact)}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(contact)}
            className="text-red-600 hover:text-red-900 hover:bg-red-50"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
