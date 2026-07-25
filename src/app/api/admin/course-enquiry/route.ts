import { NextRequest, NextResponse } from 'next/server';

const mockEnquiries = [
  { id: 'ENQ-101', studentName: 'अमन वर्मा', phone: '+91 98765 11223', course: 'संस्कृत ओलंपियाड क्रैश कोर्स', date: '24 जुलाई 2026', status: 'लंबित' },
  { id: 'ENQ-102', studentName: 'प्रिया शर्मा', phone: '+91 98123 99887', course: 'हिंदी व्याकरण मास्टरक्लास', date: '23 जुलाई 2026', status: 'संपर्कित' },
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockEnquiries.length, data: mockEnquiries });
}
