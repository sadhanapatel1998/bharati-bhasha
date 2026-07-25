import React from 'react';
import '../index.css';
import { AppProvider } from '../context/AppContext';
import { ToastContainer } from '../components/shared/ToastContainer';

export const metadata = {
  title: 'भारती भाषा ओलंपियाड (BBO) - राष्ट्रभाषा एवं संस्कृति की राष्ट्रीय परीक्षा',
  description: 'राष्ट्रीय शिक्षा नीति 2020 के अंतर्गत स्कूली छात्रों के लिए राष्ट्रव्यापी हिन्दी एवं संस्कृत भाषा ओलंपियाड परीक्षा।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Rozha+One&family=Yatra+One&display=swap" rel="stylesheet" />

          </head>
          <body className="font-poppins bg-[#FAFAF8] text-[#222222] min-h-screen antialiased selection:bg-[#7B1E1E] selection:text-[#FAFAF8]">
            <AppProvider>
              {children}
              <ToastContainer />
            </AppProvider>
          </body>
        </html>
        );
}
