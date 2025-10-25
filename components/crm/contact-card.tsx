"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  status: "active" | "inactive" | "lead" | "customer";
  lastContact: string;
  totalDeals: number;
  totalValue: number;
  tags: string[];
  notes: string;
}

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
  onCall: (contact: Contact) => void;
  onEmail: (contact: Contact) => void;
}

export function ContactCard({ contact, onEdit, onDelete, onCall, onEmail }: ContactCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    active: "success",
    inactive: "default",
    lead: "info",
    customer: "warning"
  } as const;

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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {contact.name}
            </CardTitle>
            <p className="text-sm text-gray-600">{contact.title}</p>
            <p className="text-sm text-gray-500">{contact.company}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={statusColors[contact.status]}>
              {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
            </Badge>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {contact.email}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {contact.phone}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 py-2 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{contact.totalDeals}</div>
              <div className="text-xs text-gray-500">Deals</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {formatCurrency(contact.totalValue)}
              </div>
              <div className="text-xs text-gray-500">Value</div>
            </div>
          </div>

          {/* Tags */}
          {contact.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {contact.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {contact.tags.length > 3 && (
                <Badge variant="default" className="text-xs">
                  +{contact.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Expanded Details */}
          {showDetails && (
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Last Contact</p>
                <p className="text-sm text-gray-600">{formatDate(contact.lastContact)}</p>
              </div>
              
              {contact.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{contact.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={() => onCall(contact)}
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </Button>
                <Button
                  onClick={() => onEmail(contact)}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => onEdit(contact)}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(contact.id)}
                  size="sm"
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
