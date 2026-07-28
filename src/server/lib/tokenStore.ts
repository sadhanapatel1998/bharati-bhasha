// Shared in-memory admin session token store (Next.js Route Handlers)
export interface AdminSessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
  avatar?: string;
  lastLogin?: string;
}

export const activeTokens = new Map<string, AdminSessionUser>();
