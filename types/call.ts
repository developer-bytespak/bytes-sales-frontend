export interface Call {
  id: string;
  leadId: string;
  duration: number;
  status: 'completed' | 'failed' | 'in-progress';
  notes?: string;
  createdAt: Date;
}

export interface CallSession {
  id: string;
  leadId: string;
  isActive: boolean;
  startTime: Date;
  endTime?: Date;
}
