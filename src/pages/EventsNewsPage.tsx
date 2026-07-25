import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { Calendar, Bell, Sparkles, ChevronRight } from 'lucide-react';

export const EventsNewsPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  const EVENTS = [
    {
      title: language === 'hi' ? 'राष्ट्रीय स्तर संयोजक शिक्षक सम्मेलन 2026' : 'National Language Teachers Convention 2026',
      date: 'August 15, 2026',
      venue: 'Vigyan Bhawan, New Delhi',
      desc: language === 'hi' ? 'देशभर के 500 श्रेष्ठ भाषा शिक्षकों व प्रधानाचार्यों का सम्मान समारोह' : 'Honoring 500 top school principals & Sanskrit/Hindi language coordinators.'
    },
    {
      title: language === 'hi' ? 'देववाणी संस्कृत ऑनलाइन प्रश्नोत्तरी कार्यशाला' : 'Deva Bhasha Sanskrit Online Masterclass',
      date: 'September 05, 2026',
      venue: 'Live via Zoom & YouTube',
      desc: language === 'hi' ? 'व्याकरण नियम व सुभाषित कंठस्थीकरण तकनीक पर विशेषज्ञ व्याख्यान' : 'Expert masterclass on Paninian grammar techniques and shloka chanting.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'आयोजन एवं समाचार' : 'Events & News' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'नवीनतम गतिविधियाँ' : 'Latest Bulletin'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'राष्ट्रीय आयोजन एवं प्रेस विज्ञप्ति' : 'Events, News & Press Releases'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVENTS.map((ev, i) => (
          <div key={i} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#7B1E1E] dark:text-[#C79A2D] font-bold">
              <Calendar className="w-4 h-4" />
              <span>{ev.date} • {ev.venue}</span>
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">{ev.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{ev.desc}</p>
            <button 
              onClick={() => navigateTo('registration')}
              className="text-xs font-bold text-[#C79A2D] hover:underline flex items-center gap-1 pt-2"
            >
              <span>{language === 'hi' ? 'आयोजन हेतु पंजीकरण करें' : 'Register for Event'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
