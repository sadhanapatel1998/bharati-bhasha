import { NextRequest, NextResponse } from 'next/server';

const mockGallery = [
  { id: 'GAL-1', title: 'राष्ट्रीय भाषा ओलंपियाड 2025 सम्मान समारोह', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80', date: 'नवंबर 2025' },
  { id: 'GAL-2', title: 'मुख्य परीक्षा केंद्र दिल्ली पब्लिक विद्यालय', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', date: 'अक्टूबर 2025' }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockGallery.length, data: mockGallery });
}
