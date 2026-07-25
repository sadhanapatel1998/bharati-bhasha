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

// Seed default master token for seamless admin experience
activeTokens.set('token_admin_bbo_2026_master_key', {
  id: 'ADM-1001',
  name: 'डॉ. सर्वेश कुमार शर्मा',
  email: 'admin@bharatibhasha.org',
  role: 'मुख्य राष्ट्रीय प्रशासक',
  designation: 'राष्ट्रीय निदेशक, परीक्षा मंडल',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
  lastLogin: '25 जुलाई 2026, 10:15 AM'
});
