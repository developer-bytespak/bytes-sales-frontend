export type UserRole = 'agent' | 'admin';

export type AgentStatus = 'BREAK' | 'ON_CALL' | 'OFFLINE' | 'AVAILABLE';

export interface User {
  id: string;
  name: string;
  email: string;
  googleId?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  agent_status?: AgentStatus | null;
  agent_extension?: string | null;
  is_active: boolean;
  last_login_at?: Date | null;
  refreshToken?: string | null;
  refresh_token_expires_at?: Date | null;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface UserFormData {
  name: string;
  email: string;
  googleId?: string;
  role: UserRole;
  agent_status?: AgentStatus;
  agent_extension?: string;
  is_active: boolean;
}
