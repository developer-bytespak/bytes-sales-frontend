"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CallControlPanelProps {
  isVisible: boolean;
  onClose: () => void;
  selectedLead?: {
    id: string;
    name: string;
    phone: string;
    company: string;
  };
}

interface CallState {
  id: string;
  contactName: string;
  contactPhone: string;
  contactCompany: string;
  status: 'idle' | 'dialing' | 'ringing' | 'connected' | 'on-hold' | 'ended';
  duration: number;
  startTime?: Date;
}

export function CallControlPanel({ isVisible, onClose, selectedLead }: CallControlPanelProps) {
  const [callState, setCallState] = useState<CallState>({
    id: selectedLead?.id || '',
    contactName: selectedLead?.name || '',
    contactPhone: selectedLead?.phone || '',
    contactCompany: selectedLead?.company || '',
    status: 'idle',
    duration: 0
  });

  // Update call state when selectedLead changes
  useEffect(() => {
    if (selectedLead) {
      setCallState(prev => ({
        ...prev,
        id: selectedLead.id,
        contactName: selectedLead.name,
        contactPhone: selectedLead.phone,
        contactCompany: selectedLead.company,
        status: 'idle',
        duration: 0
      }));
    }
  }, [selectedLead]);

  const [notes, setNotes] = useState('');
  const [callOutcome, setCallOutcome] = useState<'interested' | 'not-interested' | 'callback' | 'no-answer' | 'busy' | ''>('');

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState.status === 'connected' && callState.startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const duration = Math.floor((now.getTime() - callState.startTime!.getTime()) / 1000);
        setCallState(prev => ({ ...prev, duration }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState.status, callState.startTime]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setCallState(prev => ({
      ...prev,
      status: 'dialing',
      startTime: new Date()
    }));
    
    // Simulate call progression
    setTimeout(() => {
      setCallState(prev => ({ ...prev, status: 'ringing' }));
    }, 2000);
    
    setTimeout(() => {
      setCallState(prev => ({ ...prev, status: 'connected' }));
    }, 5000);
  };

  const handleEndCall = () => {
    setCallState(prev => ({ ...prev, status: 'ended' }));
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleHoldCall = () => {
    setCallState(prev => ({ 
      ...prev, 
      status: prev.status === 'on-hold' ? 'connected' : 'on-hold' 
    }));
  };

  const handleMuteCall = () => {
    // Toggle mute functionality would go here
    console.log('Toggle mute');
  };

  const handleSaveCall = () => {
    // Save call notes and outcome
    console.log('Saving call:', { notes, callOutcome, callState });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-xl border-0 bg-white">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-900">Active Call</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">{callState.contactName}</h3>
            <p className="text-sm text-gray-600">{callState.contactPhone}</p>
            <p className="text-xs text-gray-500">{callState.contactCompany}</p>
          </div>

          {/* Call Status */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <Badge variant={
                callState.status === 'connected' ? 'success' :
                callState.status === 'dialing' || callState.status === 'ringing' ? 'info' :
                callState.status === 'on-hold' ? 'warning' : 'default'
              }>
                {callState.status === 'connected' ? 'Connected' :
                 callState.status === 'dialing' ? 'Dialing...' :
                 callState.status === 'ringing' ? 'Ringing...' :
                 callState.status === 'on-hold' ? 'On Hold' :
                 callState.status === 'ended' ? 'Call Ended' : 'Idle'}
              </Badge>
              {callState.status === 'connected' && (
                <span className="text-sm font-mono text-gray-600">
                  {formatDuration(callState.duration)}
                </span>
              )}
            </div>
          </div>

          {/* Call Controls */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2">
              {callState.status === 'idle' && (
                <Button
                  onClick={handleStartCall}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Start Call
                </Button>
              )}

              {callState.status === 'connected' && (
                <>
                  <Button
                    onClick={handleHoldCall}
                    variant="outline"
                    size="sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Button>
                  
                  <Button
                    onClick={handleMuteCall}
                    variant="outline"
                    size="sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </Button>
                  
                  <Button
                    onClick={handleEndCall}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Call Notes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Call Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this call..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          {/* Call Outcome */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Call Outcome
            </label>
            <select
              value={callOutcome}
              onChange={(e) => setCallOutcome(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select outcome...</option>
              <option value="interested">Interested</option>
              <option value="not-interested">Not Interested</option>
              <option value="callback">Callback Requested</option>
              <option value="no-answer">No Answer</option>
              <option value="busy">Busy</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={handleSaveCall}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Call
            </Button>
            <Button
              onClick={handleEndCall}
              variant="outline"
              className="flex-1"
            >
              End Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
