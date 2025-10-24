export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadFilters {
  status?: string;
  company?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
