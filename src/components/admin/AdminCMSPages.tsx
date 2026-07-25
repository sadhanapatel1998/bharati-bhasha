'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Megaphone, 
  Image as ImageIcon, 
  FileText, 
  HelpCircle, 
  Quote, 
  ShieldAlert, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Save, 
  Sparkles,
  Layers,
  Upload,
  ExternalLink,
  Copy,
  Star,
  X,
  Filter,
  Check,
  Globe,
  Calendar,
  Building2,
  Tag,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AdminCMSPages: React.FC<{ subTab?: string }> = ({ subTab = 'announcements' }) => {
  const { showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<string>(subTab || 'announcements');

  React.useEffect(() => {
    if (subTab) {
      setActiveSubTab(subTab);
    }
  }, [subTab]);

  // Search filter inside subtabs
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Announcements Data & State
  const [announcements, setAnnouncements] = useState([
    { id: '1', titleHi: 'भारती भाषा ओलंपियाड 2026 हेतु हॉल टिकट निर्गत (प्रवेश पत्र प्राप्त करें)', date: '24 जुलाई 2026', category: 'मुख्य सूचना', active: true },
    { id: '2', titleHi: '482 परीक्षा केंद्रों की अंतिम राज्यवार सूची प्रकाशित की गई', date: '20 जुलाई 2026', category: 'परीक्षा केंद्र', active: true },
    { id: '3', titleHi: 'राष्ट्रीय स्तर टॉपर छात्रवृत्ति पुरस्कार राशि ₹1.25 करोड़ घोषित', date: '15 जुलाई 2026', category: 'पुरस्कार', active: true },
    { id: '4', titleHi: 'विद्यालय समूह पंजीकरण की अंतिम तिथि 15 अगस्त तक बढ़ाई गई', date: '10 जुलाई 2026', category: 'पंजीकरण', active: false },
  ]);
  const [newNotice, setNewNotice] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('मुख्य सूचना');

  // Load live announcements from backend API
  React.useEffect(() => {
    async function loadAnnouncements() {
      try {
        const token = localStorage.getItem('bbo_admin_token') || 'token_admin_bbo_2026_master_key';
        const res = await fetch('/api/admin/announcements', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const mapped = json.data.map((a: any) => ({
              id: a.id,
              titleHi: a.title,
              date: a.date,
              category: a.category,
              active: a.status === 'प्रकाशित'
            }));
            setAnnouncements(mapped);
          }
        }
      } catch (err) {
        console.warn('API fetch error for announcements:', err);
      }
    }
    loadAnnouncements();
  }, []);

  // 2. Hero Section State
  const [heroConfig, setHeroConfig] = useState({
    headingHi: 'भारती भाषा ओलंपियाड 2026',
    subheadingHi: 'हिंदी एवं संस्कृत भाषा के संवर्धन, समृद्ध साहित्य ज्ञान एवं वैज्ञानिक मूल्यांकन का सबसे बड़ा राष्ट्रीय मंच',
    ctaPrimaryHi: 'ऑनलाइन विद्यालय पंजीकरण करें',
    ctaSecondaryHi: 'प्रवेश पत्र (Hall Ticket) डाउनलोड करें',
    bannerBadgeHi: 'राष्ट्रीय परीक्षा मंडल • पंजीकृत एवं मान्यता प्राप्त संस्था',
    bannerImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
    statsBadge1: '2,850+ विद्यालय',
    statsBadge2: '4.5 लाख+ छात्र',
    showLiveTicker: true
  });

  // 3. Pages Management Data & Modal State
  const [pages, setPages] = useState([
    { 
      id: 'p1', 
      titleHi: 'हमारे बारे में (About Us)', 
      slug: 'about-us', 
      category: 'संस्थागत', 
      status: 'प्रकाशित', 
      lastUpdated: '22 जुलाई 2026', 
      views: 14200,
      contentHi: 'भारती भाषा ओलंपियाड का मुख्य उद्देश्य भारत की समृद्ध भाषाई धरोहर, हिंदी एवं देववाणी संस्कृत के प्रचार-प्रसार तथा नई पीढ़ी में व्याकरण व साहित्य की वैज्ञानिक समझ विकसित करना है।'
    },
    { 
      id: 'p2', 
      titleHi: 'परीक्षा योजना एवं पाठ्यक्रम (Syllabus & Pattern)', 
      slug: 'syllabus-scheme', 
      category: 'परीक्षा', 
      status: 'प्रकाशित', 
      lastUpdated: '18 जुलाई 2026', 
      views: 28900,
      contentHi: 'कक्षा 1 से 12 तक के विद्यार्थियों हेतु बहुविकल्पीय (MCQ) आधारित 100 अंकों का प्रश्नपत्र तैयार किया जाता है जिसमें वस्तुनिष्ठ व्याकरण, शब्द बोध एवं साहित्य ज्ञान सम्मिलित है।'
    },
    { 
      id: 'p3', 
      titleHi: 'पंजीकरण नियम एवं दिशा-निर्देश (Registration Guidelines)', 
      slug: 'registration-rules', 
      category: 'दिशा-निर्देश', 
      status: 'प्रकाशित', 
      lastUpdated: '15 जुलाई 2026', 
      views: 19800,
      contentHi: 'विद्यालय समन्वयक अपने संस्थान के न्यूनतम 50 विद्यार्थियों का सामूहिक पंजीकरण करा सकते हैं। व्यक्तिगत छात्र भी ऑनलाइन माध्यम से आवेदन कर सकते हैं।'
    },
    { 
      id: 'p4', 
      titleHi: 'पुरस्कार व छात्रवृत्ति नियम (Scholarship Rules)', 
      slug: 'scholarship-rules', 
      category: 'पुरस्कार', 
      status: 'प्रकाशित', 
      lastUpdated: '10 जुलाई 2026', 
      views: 31200,
      contentHi: 'राष्ट्रीय स्तर के प्रथम, द्वितीय व तृतीय स्थान प्राप्तकर्ताओं को स्वर्ण, रजत एवं कांस्य पदक के साथ ₹51,000, ₹31,000 एवं ₹21,000 नकद छात्रवृत्ति प्रदान की जाएगी।'
    },
    { 
      id: 'p5', 
      titleHi: 'संपर्क एवं सहायता केंद्र (Contact & Helpline)', 
      slug: 'contact-help', 
      category: 'सहायता', 
      status: 'ड्राफ्ट', 
      lastUpdated: '05 जुलाई 2026', 
      views: 3400,
      contentHi: 'किसी भी तकनीकी समस्या या OMR त्रुटि निवारण हेतु हमारे राष्ट्रीय हेल्पडेस्क नंबर 1800-123-4567 या support@bharatibhasha.org पर प्रातः 9 से संध्या 6 बजे संपर्क करें।'
    },
  ]);

  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<{ id?: string; titleHi: string; slug: string; category: string; status: string; contentHi: string } | null>(null);
  const [previewPageContent, setPreviewPageContent] = useState<any | null>(null);

  // 4. Photo Gallery Data & Modal State
  const [galleryPhotos, setGalleryPhotos] = useState([
    { id: 'g1', titleHi: 'राष्ट्रीय पुरस्कार वितरण समारोह 2025', event: 'पुरस्कार वितरण', date: '15 मार्च 2025', location: 'विज्ञान भवन, नई दिल्ली', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', featured: true },
    { id: 'g2', titleHi: 'संस्कृत श्लोकाच्चारण प्रतियोगिता', event: 'श्लोक पाठ', date: '20 अक्टूबर 2025', location: 'वाराणसी केंद्र', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80', featured: true },
    { id: 'g3', titleHi: 'ऑनलाइन OMR मूल्यांकन नियंत्रण कक्ष', event: 'मूल्यांकन', date: '05 दिसंबर 2025', location: 'जयपुर परीक्षा केंद्र', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80', featured: false },
    { id: 'g4', titleHi: 'विद्यालय प्रधानाचार्य संगोष्ठी एवं सम्मान', event: 'संगोष्ठी', date: '12 जनवरी 2026', location: 'लखनऊ, उत्तर प्रदेश', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', featured: true },
    { id: 'g5', titleHi: 'मेधावी छात्र पदक एवं प्रमाण पत्र वितरण', event: 'पुरस्कार वितरण', date: '18 फरवरी 2026', location: 'पटना केंद्र, बिहार', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', featured: false },
  ]);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ titleHi: '', event: 'पुरस्कार वितरण', date: 'आज', location: '', url: '' });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 5. FAQs Data & State
  const [faqs, setFaqs] = useState([
    { id: 'f1', q: 'भारती भाषा ओलंपियाड की परीक्षा का माध्यम क्या होगा?', a: 'परीक्षा ऑनलाइन कंप्यूटर पोर्टल एवं पंजीकृत विद्यालयों में ऑफलाइन OMR शीट दोनों माध्यमों में आयोजित की जाती है। छात्र अपनी सुविधा अनुसार चयन कर सकते हैं।', cat: 'परीक्षा माध्यम', active: true },
    { id: 'f2', q: 'छात्रवृत्ति पुरस्कार राशि का वितरण किस प्रकार होगा?', a: 'राष्ट्रीय स्तर के शीर्ष 1,250 छात्रवृत्ति विजेताओं को सीधे उनके अथवा उनके अभिभावक के बैंक खाते में DBT द्वारा पुरस्कार राशि प्रेषित की जाती है।', cat: 'छात्रवृत्ति', active: true },
    { id: 'f3', q: 'क्या व्यक्तिगत छात्र भी परीक्षा में भाग ले सकते हैं?', a: 'हाँ, यदि आपका विद्यालय पंजीकृत नहीं है, तब भी आप "व्यक्तिगत छात्र पंजीकरण" विकल्प का चयन कर ऑनलाइन परीक्षा दे सकते हैं।', cat: 'पंजीकरण', active: true },
    { id: 'f4', q: 'हॉल टिकट / प्रवेश पत्र कब और कैसे डाउनलोड करें?', a: 'परीक्षा तिथि से 15 दिन पूर्व एडमिन पोर्टल एवं छात्र डैशबोर्ड में हॉल टिकट डाउनलोड लिंक सक्रिय हो जाता है।', cat: 'प्रवेश पत्र', active: true },
  ]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [faqCat, setFaqCat] = useState('परीक्षा माध्यम');

  // 6. Testimonials Data & State
  const [testimonials, setTestimonials] = useState([
    { id: 't1', name: 'डॉ. रमेश चंद्र झा', role: 'प्रधानाचार्य', school: 'दिल्ली पब्लिक स्कूल, आर के पुरम', comment: 'भारती भाषा ओलंपियाड ने हमारे विद्यालय के छात्रों में हिंदी साहित्य और देववाणी संस्कृत के प्रति अभूतपूर्व उत्साह जगाया है। मूल्यांकन प्रणाली अत्यंत पारदर्शी है।', rating: 5, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80', featured: true },
    { id: 't2', name: 'अनन्या शर्मा', role: 'राष्ट्रीय स्वर्ण पदक विजेता (कक्षा 8)', school: 'भारतीय विद्या भवन, जयपुर', comment: 'वैज्ञानिक मूल्यांकन पद्धति और सुंदर ई-सर्टिफिकेट से मुझे बहुत प्रोत्साहन मिला। आगामी सत्र में भी मैं अवश्य भाग लूँगी।', rating: 5, photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80', featured: true },
    { id: 't3', name: 'प्रो. सर्वेश शास्त्री', role: 'संस्कृत विभागाध्यक्ष', school: 'केंद्रीय विद्यालय, वाराणसी', comment: 'संस्कृत श्लोक पाठ एवं व्याकरण प्रतियोगिता से छात्रों की उच्चारण क्षमता एवं आत्मविश्वास में अद्भुत सुधार देखा गया है।', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', featured: true },
  ]);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: 'शिक्षक', school: '', comment: '', rating: 5, photo: '' });

  // 7. Policies Data & State
  const [policies, setPolicies] = useState([
    { id: 'pol1', titleHi: 'OMR शीट मूल्यांकन एवं निष्पक्षता नियमावली 2026', code: 'POL-OMR-01', updated: '2026-06-15', status: 'लागू', text: 'समस्त OMR उत्तर पुस्तिकाओं का मूल्यांकन कंप्यूटर AI स्कैनर द्वारा द्वि-स्तरीय सत्यापन प्रक्रिया के साथ संपन्न किया जाता है।' },
    { id: 'pol2', titleHi: 'छात्रवृत्ति आवंटन एवं प्रत्यक्ष अंतरण (DBT) नीति', code: 'POL-SCH-02', updated: '2026-05-20', status: 'लागू', text: 'पुरस्कार राशि सीधे लाभार्थी छात्र के आधार-लिंक्ड बैंक खाते में स्थानांतरित की जाएगी। विद्यालय प्रतिनिधियों को प्रोत्साहन निधि प्रदान की जाएगी।' },
    { id: 'pol3', titleHi: 'परीक्षा कदाचार एवं अनुचित साधन निवारण नियमावली', code: 'POL-MAL-03', updated: '2026-04-10', status: 'लागू', text: 'परीक्षा के दौरान किसी भी अनुचित साधन या प्रतिरूपण (Impersonation) का प्रयोग पाए जाने पर संबंधित छात्र का परिणाम निरस्त कर दिया जाएगा।' },
  ]);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [newPolicy, setNewPolicy] = useState({ titleHi: '', code: '', text: '', status: 'लागू' });

  // 8. Media Library Data
  const [mediaItems, setMediaItems] = useState([
    { id: 'm1', name: 'award_ceremony_2025.jpg', size: '2.4 MB', type: 'छवि (JPG)', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', date: '2026-07-20' },
    { id: 'm2', name: 'sanskrit_shloka_recitation.jpg', size: '1.8 MB', type: 'छवि (JPG)', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80', date: '2026-07-18' },
    { id: 'm3', name: 'gold_medal_certificate_template.pdf', size: '3.1 MB', type: 'दस्तावेज़ (PDF)', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80', date: '2026-07-15' },
    { id: 'm4', name: 'olympiad_official_logo.png', size: '650 KB', type: 'छवि (PNG)', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', date: '2026-07-10' },
  ]);

  // Handlers
  const handleAddNotice = () => {
    if (!newNotice.trim()) return;
    const item = {
      id: Date.now().toString(),
      titleHi: newNotice,
      date: 'आज',
      category: noticeCategory,
      active: true
    };
    setAnnouncements([item, ...announcements]);
    setNewNotice('');
    showToast('नई घोषणा सफलतापूर्वक प्रकाशित की गई!', 'success');
  };

  const handleToggleNotice = (id: string) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, active: !a.active } : a));
    showToast('घोषणा की स्थिति अद्यतन की गई।', 'info');
  };

  const handleDeleteNotice = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    showToast('घोषणा हटा दी गई है।', 'info');
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('मुख्य बैनर (Hero Banner) सामग्री एवं स्टाइल सुरक्षित कर दिए गए हैं!', 'success');
  };

  const handleSavePage = () => {
    if (!editingPage || !editingPage.titleHi.trim()) return;
    if (editingPage.id) {
      // Edit
      setPages(pages.map(p => p.id === editingPage.id ? { 
        ...p, 
        titleHi: editingPage.titleHi, 
        slug: editingPage.slug || editingPage.titleHi.toLowerCase().replace(/\s+/g, '-'),
        category: editingPage.category,
        status: editingPage.status,
        contentHi: editingPage.contentHi,
        lastUpdated: 'आज'
      } : p));
      showToast('पृष्ठ सामग्री अद्यतन कर दी गई!', 'success');
    } else {
      // Create
      const newP = {
        id: `p-${Date.now()}`,
        titleHi: editingPage.titleHi,
        slug: editingPage.slug || editingPage.titleHi.toLowerCase().replace(/\s+/g, '-'),
        category: editingPage.category || 'सामान्य',
        status: editingPage.status || 'प्रकाशित',
        lastUpdated: 'आज',
        views: 1,
        contentHi: editingPage.contentHi
      };
      setPages([newP, ...pages]);
      showToast('नया पृष्ठ सफलतापूर्वक निर्मित एवं प्रकाशित किया गया!', 'success');
    }
    setIsPageModalOpen(false);
    setEditingPage(null);
  };

  const handleDeletePage = (id: string) => {
    setPages(pages.filter(p => p.id !== id));
    showToast('पृष्ठ हटा दिया गया है।', 'info');
  };

  const handleAddPhoto = () => {
    if (!newPhoto.titleHi.trim() || !newPhoto.url.trim()) {
      showToast('कृपया शीर्षक एवं चित्र यूआरएल प्रविष्ट करें!', 'error');
      return;
    }
    const item = {
      id: `g-${Date.now()}`,
      titleHi: newPhoto.titleHi,
      event: newPhoto.event,
      date: newPhoto.date || '2026',
      location: newPhoto.location || 'राष्ट्रीय केंद्र',
      url: newPhoto.url,
      featured: true
    };
    setGalleryPhotos([item, ...galleryPhotos]);
    setNewPhoto({ titleHi: '', event: 'पुरस्कार वितरण', date: 'आज', location: '', url: '' });
    setIsGalleryModalOpen(false);
    showToast('नई चित्र गैलरी में सफलतापूर्वक जोड़ी गई!', 'success');
  };

  const handleDeletePhoto = (id: string) => {
    setGalleryPhotos(galleryPhotos.filter(g => g.id !== id));
    showToast('चित्र गैलरी से हटा दिया गया है।', 'info');
  };

  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    setFaqs([...faqs, { id: `faq-${Date.now()}`, q: newFaqQ, a: newFaqA, cat: faqCat, active: true }]);
    setNewFaqQ('');
    setNewFaqA('');
    showToast('नया प्रश्नोत्तरी (FAQ) जोड़ा गया!', 'success');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
    showToast('FAQ प्रश्न हटा दिया गया।', 'info');
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name.trim() || !newTestimonial.comment.trim()) {
      showToast('कृपया नाम एवं अनुभव टिप्पणी प्रविष्ट करें!', 'error');
      return;
    }
    const item = {
      id: `t-${Date.now()}`,
      name: newTestimonial.name,
      role: newTestimonial.role,
      school: newTestimonial.school || 'संबद्ध विद्यालय',
      comment: newTestimonial.comment,
      rating: Number(newTestimonial.rating) || 5,
      photo: newTestimonial.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      featured: true
    };
    setTestimonials([item, ...testimonials]);
    setNewTestimonial({ name: '', role: 'शिक्षक', school: '', comment: '', rating: 5, photo: '' });
    setIsTestimonialModalOpen(false);
    showToast('नया समीक्षा/अनुभव प्रकाशित किया गया!', 'success');
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    showToast('अनुभव हटा दिया गया।', 'info');
  };

  const handleAddPolicy = () => {
    if (!newPolicy.titleHi.trim() || !newPolicy.text.trim()) {
      showToast('कृपया नियमावली शीर्षक एवं विवरण प्रविष्ट करें!', 'error');
      return;
    }
    const item = {
      id: `pol-${Date.now()}`,
      titleHi: newPolicy.titleHi,
      code: newPolicy.code || `POL-${Math.floor(100 + Math.random() * 900)}`,
      updated: 'आज',
      status: newPolicy.status,
      text: newPolicy.text
    };
    setPolicies([item, ...policies]);
    setNewPolicy({ titleHi: '', code: '', text: '', status: 'लागू' });
    setIsPolicyModalOpen(false);
    showToast('नई नीति/नियमावली पंजीकृत कर दी गई!', 'success');
  };

  const handleDeletePolicy = (id: string) => {
    setPolicies(policies.filter(p => p.id !== id));
    showToast('नीति हटा दी गई है।', 'info');
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('चित्र यूआरएल क्लिपबोर्ड पर कॉपी हो गया!', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header Navigation Banner */}
      <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7B1E1E] to-[#C79A2D] text-white flex items-center justify-center font-bold shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                वेबसाइट सामग्री प्रबंधन सिस्टम (CMS Portal)
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                मुख्य बैनर, घोषणाएँ, पृष्ठ सम्पादक, फोटो गैलरी, प्रश्नोत्तरी, समीक्षाएँ एवं नीतियाँ
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Tabs Switcher Bar */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto">
          {[
            { id: 'announcements', label: 'घोषणाएँ', icon: Megaphone },
            { id: 'hero-section', label: 'मुख्य बैनर', icon: ImageIcon },
            { id: 'pages', label: 'पृष्ठ प्रबंधन', icon: FileText, badge: pages.length.toString() },
            { id: 'gallery', label: 'चित्र वीथिका', icon: ImageIcon, badge: galleryPhotos.length.toString() },
            { id: 'faqs', label: 'प्रश्न उत्तर', icon: HelpCircle },
            { id: 'testimonials', label: 'अनुभव', icon: Quote },
            { id: 'policies', label: 'नीतियाँ', icon: ShieldAlert },
            { id: 'media-library', label: 'मीडिया', icon: Upload },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id);
                  setSearchTerm('');
                }}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive 
                    ? 'bg-[#7B1E1E] text-white shadow-sm font-bold' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C79A2D]' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-[#C79A2D] text-[#7B1E1E]' : 'bg-gray-200 dark:bg-gray-700 text-gray-700'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ----------------- SUB TAB 1: ANNOUNCEMENTS ----------------- */}
      {activeSubTab === 'announcements' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                घोषणाएँ एवं लाइव टिकर संदेश (Announcements Bulletin)
              </h2>
              <p className="text-xs text-gray-500">मुख्य पृष्ठ पर प्रकाशित होने वाली राष्ट्रीय सूचना पट्टी</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200/50 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              लाइव प्रसारण सक्रिय
            </span>
          </div>

          {/* New Announcement Box */}
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3">
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">नई राष्ट्रीय सूचना प्रसारित करें</span>
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value)}
                className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold"
              >
                <option value="मुख्य सूचना">मुख्य सूचना</option>
                <option value="परीक्षा केंद्र">परीक्षा केंद्र</option>
                <option value="पुरस्कार">पुरस्कार व छात्रवृत्ति</option>
                <option value="पंजीकरण">पंजीकरण तिथि</option>
                <option value="परिणाम">परीक्षा परिणाम</option>
              </select>
              <input 
                type="text"
                placeholder="घोषणा का विवरण हिंदी में लिखें (उदा. सत्र 2026 हॉल टिकट जारी)..."
                value={newNotice}
                onChange={(e) => setNewNotice(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium"
              />
              <button 
                onClick={handleAddNotice}
                className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#C79A2D]" />
                तुरंत प्रसारित करें
              </button>
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">हाल ही में प्रकाशित घोषणाएँ ({announcements.length})</span>
            {announcements.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#7B1E1E]/20">
                      {item.category}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">{item.titleHi}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span>प्रकाशन तिथि: {item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => handleToggleNotice(item.id)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-colors ${
                      item.active 
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {item.active ? 'सक्रिय (Live)' : 'निष्क्रिय (Paused)'}
                  </button>
                  <button 
                    onClick={() => handleDeleteNotice(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                    title="हटाएँ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 2: HERO BANNER SECTION ----------------- */}
      {activeSubTab === 'hero-section' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Controls */}
          <form onSubmit={handleSaveHero} className="lg:col-span-7 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-5">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                मुख्य बैनर सम्पादन (Hero Banner Customizer)
              </h2>
              <p className="text-xs text-gray-500">होमपेज के शीर्ष बैनर, चित्र, टेक्स्ट एवं कॉल-टू-एक्शन बटन को संपादित करें</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">शीर्ष टैग बैज (Top Tagline Badge)</label>
                <input 
                  type="text"
                  value={heroConfig.bannerBadgeHi}
                  onChange={(e) => setHeroConfig({ ...heroConfig, bannerBadgeHi: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">मुख्य शीर्षक (H1 Title)</label>
                <input 
                  type="text"
                  value={heroConfig.headingHi}
                  onChange={(e) => setHeroConfig({ ...heroConfig, headingHi: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold font-playfair text-sm text-[#7B1E1E] dark:text-[#C79A2D]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">उप-शीर्षक विवरण (Subheading Details)</label>
                <textarea 
                  rows={3}
                  value={heroConfig.subheadingHi}
                  onChange={(e) => setHeroConfig({ ...heroConfig, subheadingHi: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">प्राथमिक बटन पाठ (Primary CTA)</label>
                  <input 
                    type="text"
                    value={heroConfig.ctaPrimaryHi}
                    onChange={(e) => setHeroConfig({ ...heroConfig, ctaPrimaryHi: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">द्वितीयक बटन पाठ (Secondary CTA)</label>
                  <input 
                    type="text"
                    value={heroConfig.ctaSecondaryHi}
                    onChange={(e) => setHeroConfig({ ...heroConfig, ctaSecondaryHi: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">मुख्य पृष्ठ पृष्ठभूमि चित्र यूआरएल (Banner Background Image URL)</label>
                <input 
                  type="text"
                  value={heroConfig.bannerImage}
                  onChange={(e) => setHeroConfig({ ...heroConfig, bannerImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-[#C79A2D]" />
                मुख्य बैनर परिवर्तन सुरक्षित करें
              </button>
            </div>
          </form>

          {/* Real-time Interactive Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#C79A2D]" />
                लाइव बैनर पूर्वावलोकन (Live Preview)
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                रियल-टाइम सिंक
              </span>
            </div>

            {/* Simulated Desktop Hero Banner */}
            <div className="bg-gradient-to-br from-[#7B1E1E] via-[#8B2323] to-[#420E0E] text-[#F5F0E6] rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-[#C79A2D]/30 space-y-5">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#C79A2D]/15 rounded-full blur-2xl pointer-events-none"></div>

              <div className="inline-flex items-center gap-1.5 bg-[#C79A2D]/20 border border-[#C79A2D]/30 px-3 py-1 rounded-full text-[10px] font-extrabold text-[#C79A2D]">
                <Sparkles className="w-3 h-3" />
                {heroConfig.bannerBadgeHi}
              </div>

              <h1 className="font-playfair text-xl font-extrabold leading-tight">
                {heroConfig.headingHi}
              </h1>

              <p className="text-xs text-gray-200 leading-relaxed font-light">
                {heroConfig.subheadingHi}
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <button className="bg-[#C79A2D] text-[#7B1E1E] font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-1">
                  <span>{heroConfig.ctaPrimaryHi}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button className="bg-white/10 border border-white/20 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center justify-center">
                  {heroConfig.ctaSecondaryHi}
                </button>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-300">
                <span>🏆 {heroConfig.statsBadge1}</span>
                <span>🎓 {heroConfig.statsBadge2}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 3: PAGES MANAGEMENT ----------------- */}
      {activeSubTab === 'pages' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                वेबसाइट पृष्ठ प्रबंधन (Pages Content Manager)
              </h2>
              <p className="text-xs text-gray-500">हमारे बारे में, परीक्षा योजना, नियम, सहायता एवं नीतियाँ पृष्ठों का सम्पादन</p>
            </div>
            <button 
              onClick={() => {
                setEditingPage({ titleHi: '', slug: '', category: 'सामान्य', status: 'प्रकाशित', contentHi: '' });
                setIsPageModalOpen(true);
              }}
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#C79A2D]" />
              नया पृष्ठ निर्मित करें
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/40 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs">
            <Search className="w-4 h-4 text-gray-400 ml-2" />
            <input 
              type="text"
              placeholder="पृष्ठ शीर्षक या स्लग (Slug) से खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs font-medium"
            />
          </div>

          {/* Pages Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">पृष्ठ शीर्षक (Hindi)</th>
                  <th className="py-3 px-4">स्लग (URL Slug)</th>
                  <th className="py-3 px-4">श्रेणी</th>
                  <th className="py-3 px-4">अंतिम अद्यतन</th>
                  <th className="py-3 px-4">व्यूज (Views)</th>
                  <th className="py-3 px-4">स्थिति</th>
                  <th className="py-3 px-4 text-right">कार्यवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {pages
                  .filter(p => p.titleHi.toLowerCase().includes(searchTerm.toLowerCase()) || p.slug.includes(searchTerm))
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D] shrink-0" />
                        <span>{p.titleHi}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500">/{p.slug}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] px-2.5 py-1 rounded-full font-bold">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">{p.lastUpdated}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-700 dark:text-gray-300">{p.views.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === 'प्रकाशित' 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => setPreviewPageContent(p)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg"
                            title="पूर्वावलोकन देखें"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setEditingPage({ ...p });
                              setIsPageModalOpen(true);
                            }}
                            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            title="संपादित करें"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeletePage(p.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg"
                            title="हटाएँ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Page Modal (Add/Edit) */}
      {isPageModalOpen && editingPage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-playfair font-bold text-base text-gray-900 dark:text-white">
                {editingPage.id ? 'पृष्ठ सामग्री सम्पादित करें' : 'नया पृष्ठ तैयार करें'}
              </h3>
              <button onClick={() => setIsPageModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">पृष्ठ शीर्षक (Hindi Title)</label>
                <input 
                  type="text"
                  value={editingPage.titleHi}
                  onChange={(e) => setEditingPage({ ...editingPage, titleHi: e.target.value })}
                  placeholder="उदा. हमारे लक्ष्य एवं नीति..."
                  className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">स्लग (URL Slug)</label>
                  <input 
                    type="text"
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    placeholder="our-vision"
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">प्रकाशन स्थिति</label>
                  <select 
                    value={editingPage.status}
                    onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="प्रकाशित">प्रकाशित (Published)</option>
                    <option value="ड्राफ्ट">ड्राफ्ट (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">विस्तृत पृष्ठ विवरण एवं सामग्री (Page Content)</label>
                <textarea 
                  rows={8}
                  value={editingPage.contentHi}
                  onChange={(e) => setEditingPage({ ...editingPage, contentHi: e.target.value })}
                  placeholder="पृष्ठ की मुख्य सामग्री हिंदी में यहाँ दर्ज करें..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setIsPageModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                रद्द करें
              </button>
              <button 
                onClick={handleSavePage}
                className="bg-[#7B1E1E] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-[#C79A2D]" />
                सुरक्षित एवं प्रकाशित करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Page Modal */}
      {previewPageContent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <span className="text-[10px] bg-[#7B1E1E]/10 text-[#7B1E1E] font-bold px-2.5 py-0.5 rounded-full">
                  {previewPageContent.category}
                </span>
                <h3 className="font-playfair font-bold text-lg text-gray-900 dark:text-white mt-1">
                  {previewPageContent.titleHi}
                </h3>
              </div>
              <button onClick={() => setPreviewPageContent(null)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="prose dark:prose-invert text-xs leading-relaxed text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 whitespace-pre-wrap">
              {previewPageContent.contentHi}
            </div>

            <div className="flex justify-between items-center text-[11px] text-gray-400 pt-2">
              <span>स्लग: /{previewPageContent.slug}</span>
              <button 
                onClick={() => setPreviewPageContent(null)}
                className="bg-[#7B1E1E] text-white px-4 py-1.5 rounded-xl font-bold"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 4: GALLERY ----------------- */}
      {activeSubTab === 'gallery' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                राष्ट्रीय फोटो एवं कार्यक्रम वीथिका (Photo Gallery)
              </h2>
              <p className="text-xs text-gray-500">पुरस्कार वितरण समारोह, परीक्षा केंद्रों एवं प्रतियोगिताओं की तस्वीरें</p>
            </div>
            <button 
              onClick={() => setIsGalleryModalOpen(true)}
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#C79A2D]" />
              नई फोटो अपलोड करें
            </button>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 space-y-3 group hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img 
                    src={photo.url} 
                    alt={photo.titleHi} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {photo.event}
                  </span>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => setPreviewImage(photo.url)}
                      className="p-2 bg-white text-gray-900 rounded-xl shadow-lg font-bold text-xs flex items-center gap-1 hover:scale-105"
                    >
                      <Eye className="w-4 h-4 text-[#7B1E1E]" />
                      देखें
                    </button>
                    <button 
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 bg-red-600 text-white rounded-xl shadow-lg font-bold text-xs hover:scale-105"
                      title="हटाएँ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-1 text-xs">
                  <h4 className="font-bold text-gray-900 dark:text-white leading-snug">{photo.titleHi}</h4>
                  <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1">
                    <span>📍 {photo.location}</span>
                    <span>📅 {photo.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Photo Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-playfair font-bold text-base text-gray-900 dark:text-white">
                नई फोटो गैलरी में जोड़ें
              </h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">चित्र शीर्षक (Photo Caption in Hindi)</label>
                <input 
                  type="text"
                  value={newPhoto.titleHi}
                  onChange={(e) => setNewPhoto({ ...newPhoto, titleHi: e.target.value })}
                  placeholder="उदा. पुरस्कार वितरण 2026..."
                  className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">कार्यक्रम श्रेणी</label>
                  <select 
                    value={newPhoto.event}
                    onChange={(e) => setNewPhoto({ ...newPhoto, event: e.target.value })}
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="पुरस्कार वितरण">पुरस्कार वितरण</option>
                    <option value="श्लोक पाठ">श्लोक पाठ</option>
                    <option value="परीक्षा केंद्र">परीक्षा केंद्र</option>
                    <option value="संगोष्ठी">संगोष्ठी</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">स्थान / शहर</label>
                  <input 
                    type="text"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    placeholder="नई दिल्ली"
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">चित्र ऑनलाइन यूआरएल (Photo Image URL)</label>
                <input 
                  type="text"
                  value={newPhoto.url}
                  onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setIsGalleryModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400"
              >
                रद्द करें
              </button>
              <button 
                onClick={handleAddPhoto}
                className="bg-[#7B1E1E] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4 text-[#C79A2D]" />
                गैलरी में अपलोड करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={previewImage} alt="Preview" className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 5: FAQS ----------------- */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
              सामान्य प्रश्नोत्तर प्रबंधन (FAQs Manager)
            </h2>
            <p className="text-xs text-gray-500">विद्यार्थियों, शिक्षकों एवं अभिभावकों के प्रश्नों का त्वरित समाधान</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3 text-xs">
            <span className="font-bold text-gray-800 dark:text-gray-200">नया FAQ प्रविष्ट करें</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input 
                type="text"
                placeholder="प्रश्न लिखें (उदा. हॉल टिकट कब जारी होगा?)"
                value={newFaqQ}
                onChange={(e) => setNewFaqQ(e.target.value)}
                className="sm:col-span-2 px-3.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
              <select 
                value={faqCat}
                onChange={(e) => setFaqCat(e.target.value)}
                className="px-3.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold"
              >
                <option value="परीक्षा माध्यम">परीक्षा माध्यम</option>
                <option value="छात्रवृत्ति">छात्रवृत्ति एवं पुरस्कार</option>
                <option value="पंजीकरण">पंजीकरण प्रक्रिया</option>
                <option value="प्रवेश पत्र">प्रवेश पत्र (Hall Ticket)</option>
              </select>
            </div>
            <textarea 
              rows={2}
              placeholder="विस्तृत उत्तर लिखें..."
              value={newFaqA}
              onChange={(e) => setNewFaqA(e.target.value)}
              className="w-full px-3.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl leading-relaxed"
            />
            <button 
              onClick={handleAddFaq}
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#C79A2D]" />
              FAQ सहेजें एवं प्रकाशित करें
            </button>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2 text-xs">
                <div className="font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span className="text-sm">प्र. {f.q}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/10 px-2.5 py-0.5 rounded-full font-bold">
                      {f.cat}
                    </span>
                    <button 
                      onClick={() => handleDeleteFaq(f.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-2 border-l-2 border-[#C79A2D]">
                  उ. {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 6: TESTIMONIALS ----------------- */}
      {activeSubTab === 'testimonials' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Quote className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                प्रशंसापत्र एवं अनुभव समीक्षाएँ (Testimonials)
              </h2>
              <p className="text-xs text-gray-500">प्रधानाचार्यों, शिक्षकों एवं टॉपर छात्रों की उत्कृष्ट समीक्षाएँ</p>
            </div>
            <button 
              onClick={() => setIsTestimonialModalOpen(true)}
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#C79A2D]" />
              नया अनुभव जोड़ें
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4 text-xs relative group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#C79A2D]" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                      <p className="text-[10px] text-gray-400">{t.role} • {t.school}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-playfair font-bold text-base text-gray-900 dark:text-white">
                नया प्रशंसापत्र प्रविष्ट करें
              </h3>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">नाम (Full Name)</label>
                  <input 
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    placeholder="उदा. डॉ. रमेश शर्मा"
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">पद / भूमिका</label>
                  <input 
                    type="text"
                    value={newTestimonial.role}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                    placeholder="प्रधानाचार्य / स्वर्ण पदक विजेता"
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">विद्यालय का नाम</label>
                <input 
                  type="text"
                  value={newTestimonial.school}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, school: e.target.value })}
                  placeholder="दिल्ली पब्लिक स्कूल"
                  className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">अनुभव टिप्पणी (Hindi Review)</label>
                <textarea 
                  rows={4}
                  value={newTestimonial.comment}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                  placeholder="अपना अनुभव लिखें..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setIsTestimonialModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400"
              >
                रद्द करें
              </button>
              <button 
                onClick={handleAddTestimonial}
                className="bg-[#7B1E1E] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-[#C79A2D]" />
                प्रशंसापत्र प्रकाशित करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 7: POLICIES ----------------- */}
      {activeSubTab === 'policies' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                नीतियाँ एवं आधिकारिक नियमावली (Policies & Regulations)
              </h2>
              <p className="text-xs text-gray-500">OMR मूल्यांकन नियम, छात्रवृत्ति प्रत्यक्ष अंतरण नीति एवं कदाचार निवारण</p>
            </div>
            <button 
              onClick={() => setIsPolicyModalOpen(true)}
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#C79A2D]" />
              नई नीति प्रविष्ट करें
            </button>
          </div>

          <div className="space-y-4">
            {policies.map((p) => (
              <div key={p.id} className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/10 px-2.5 py-0.5 rounded-full">
                      {p.code}
                    </span>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{p.titleHi}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {p.status}
                    </span>
                    <button 
                      onClick={() => handleDeletePolicy(p.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{p.text}</p>
                <div className="text-[10px] text-gray-400 pt-1">अंतिम संशोधन: {p.updated}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Policy Modal */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-playfair font-bold text-base text-gray-900 dark:text-white">
                नई नीति / नियम जोड़ें
              </h3>
              <button onClick={() => setIsPolicyModalOpen(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">नीति शीर्षक (Policy Title)</label>
                <input 
                  type="text"
                  value={newPolicy.titleHi}
                  onChange={(e) => setNewPolicy({ ...newPolicy, titleHi: e.target.value })}
                  placeholder="उदा. OMR मूल्यांकन निष्पक्षता नियमावली..."
                  className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">विस्तृत नियम एवं विवरण</label>
                <textarea 
                  rows={5}
                  value={newPolicy.text}
                  onChange={(e) => setNewPolicy({ ...newPolicy, text: e.target.value })}
                  placeholder="नीति के नियम विस्तार से लिखें..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setIsPolicyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400"
              >
                रद्द करें
              </button>
              <button 
                onClick={handleAddPolicy}
                className="bg-[#7B1E1E] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-[#C79A2D]" />
                नीति सुरक्षित करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 8: MEDIA LIBRARY ----------------- */}
      {activeSubTab === 'media-library' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                डिजिटल मीडिया लाइब्रेरी (Digital Media Assets)
              </h2>
              <p className="text-xs text-gray-500">चित्र, डिजिटल लोगो, बैनर एवं प्रमाण पत्र टेम्प्लेट का संग्रह</p>
            </div>
            <button 
              onClick={() => showToast('नवीन फोटो मीडिया लाइब्रेरी में अपलोड हो गई है!', 'success')}
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Upload className="w-4 h-4 text-[#C79A2D]" />
              नया एसेट अपलोड करें
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mediaItems.map((m) => (
              <div key={m.id} className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-3 group hover:shadow-md transition-shadow">
                <div className="relative h-32 overflow-hidden rounded-xl bg-gray-200">
                  <img src={m.url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <button 
                    onClick={() => handleCopyUrl(m.url)}
                    className="absolute bottom-2 right-2 p-1.5 bg-white/90 text-gray-900 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-xs hover:bg-white"
                  >
                    <Copy className="w-3 h-3 text-[#7B1E1E]" />
                    कॉपी यूआरएल
                  </button>
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-gray-900 dark:text-white truncate">{m.name}</div>
                  <div className="text-[10px] text-gray-400 flex items-center justify-between">
                    <span>{m.type}</span>
                    <span>{m.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
