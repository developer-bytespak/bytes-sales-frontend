export interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
  status: 'draft' | 'sent' | 'failed';
  templateId?: string;
  createdAt: Date;
  sentAt?: Date;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: Date;
  updatedAt: Date;
}
