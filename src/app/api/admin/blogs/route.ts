import { NextRequest, NextResponse } from 'next/server';

const mockBlogs = [
  { id: '1', title: 'भारतीय भाषा ओलंपियाड 2026 की तैयारी रणनीति', category: 'भाषा एवं व्याकरण', author: 'डॉ. सर्वेश कुमार', date: '22 जुलाई 2026', views: 3420 },
  { id: '2', title: 'संस्कृत भाषा सीखने के मुख्य सिद्धांत एवं सरल सूत्र', category: 'संस्कृत', author: 'प्रो. रंजीत देव', date: '18 जुलाई 2026', views: 5120 },
  { id: '3', title: 'राष्ट्रीय शिक्षा नीति 2020 में मातृभाषा का महत्व', category: 'शिक्षा नीति', author: 'डॉ. अलका शर्मा', date: '10 जुलाई 2026', views: 2890 }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockBlogs.length, data: mockBlogs });
}

export async function POST(req: NextRequest) {
  const { title, category, content } = await req.json().catch(() => ({}));
  const newBlog = {
    id: String(Date.now()),
    title: title || 'नया ब्लॉग',
    category: category || 'सामान्य',
    author: 'प्रशासक',
    date: 'आज, 2026',
    views: 0,
    content: content || ''
  };
  return NextResponse.json({ success: true, message: 'ब्लॉग सफलतापूर्वक प्रकाशित किया गया।', data: newBlog }, { status: 201 });
}
