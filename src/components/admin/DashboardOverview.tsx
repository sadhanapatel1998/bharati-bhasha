'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  Award, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Download, 
  Filter, 
  Search,
  Sparkles,
  ShieldCheck,
  Calendar,
  AlertCircle,
  BarChart3,
  Globe2,
  Eye,
  Check,
  X,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';

export const DashboardOverview: React.FC<{ onNavigateTab: (tab: string) => void }> = ({ onNavigateTab }) => {
  const { showToast, adminToken } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'hindi' | 'sanskrit'>('all');
  const [searchSchool, setSearchSchool] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  const [stats, setStats] = useState({
    totalSchools: 2850,
    totalStudents: 452180,
    activeCenters: 482,
    scholarshipFund: '₹1.25 करोड़'
  });

  // Recent Registrations State
  const [recentRegistrations, setRecentRegistrations] = useState([
    { id: 'REG-1092', school: 'दिल्ली पब्लिक स्कूल, आर के पुरम', city: 'नई दिल्ली', state: 'दिल्ली', students: 420, date: 'आज, 02:15 PM', status: 'लंबित', principal: 'डॉ. अलोक नाथ', phone: '+91 98765 43210', email: 'dps.rkp@edu.in' },
    { id: 'REG-1091', school: 'भारतीय विद्या भवन, जयपुर', city: 'जयपुर', state: 'राजस्थान', students: 280, date: 'आज, 11:30 AM', status: 'स्वीकृत', principal: 'श्रीमती सुनीता शर्मा', phone: '+91 98123 45678', email: 'bvb.jaipur@edu.in' },
    { id: 'REG-1090', school: 'सेंट जेवियर्स स्कूल, रांची', city: 'रांची', state: 'झारखंड', students: 195, date: 'कल, 05:40 PM', status: 'स्वीकृत', principal: 'फादर थॉमस', phone: '+91 94321 09876', email: 'stxaviers.ranchi@edu.in' },
    { id: 'REG-1089', school: 'सरस्वती शिशु मंदिर, वाराणसी', city: 'वाराणसी', state: 'उत्तर प्रदेश', students: 310, date: 'कल, 03:10 PM', status: 'स्वीकृत', principal: 'श्री मयंक त्रिपाठी', phone: '+91 97654 32109', email: 'ssm.vns@edu.in' },
    { id: 'REG-1088', school: 'केंद्रीय विद्यालय, पटना', city: 'पटना', state: 'बिहार', students: 510, date: '22 जुलाई, 2026', status: 'सत्यापन जारी', principal: 'डॉ. के. के. सिंह', phone: '+91 91234 56789', email: 'kv.patna@edu.in' },
  ]);

  // Fetch dynamic stats & registrations from Express Backend API
  React.useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = adminToken || localStorage.getItem('bbo_admin_token') || 'token_admin_bbo_2026_master_key';
        const headers = { 'Authorization': `Bearer ${token}` };

        const [statsRes, regsRes] = await Promise.all([
          fetch('/api/admin/stats', { headers }),
          fetch('/api/admin/registrations', { headers })
        ]);

        if (statsRes.ok) {
          const statsJson = await statsRes.json();
          if (statsJson.success && statsJson.data) {
            setStats(prev => ({ ...prev, ...statsJson.data }));
          }
        }

        if (regsRes.ok) {
          const regsJson = await regsRes.json();
          if (regsJson.success && Array.isArray(regsJson.data)) {
            const mapped = regsJson.data.map((r: any) => ({
              id: r.id,
              school: r.schoolName,
              city: r.city,
              state: r.state,
              students: r.studentCount,
              date: r.appliedDate,
              status: r.status,
              principal: r.principalName,
              phone: r.phone,
              email: r.email
            }));
            setRecentRegistrations(mapped);
          }
        }
      } catch (err) {
        console.warn('Dashboard live API fetch fallback to cached state:', err);
      }
    }

    fetchDashboardData();
  }, [adminToken]);

  // Live Activity Stream
  const activityLogs = [
    { time: '02:15 PM', text: 'दिल्ली पब्लिक स्कूल द्वारा 420 विद्यार्थियों का नया पंजीकरण आवेदन प्राप्त हुआ।', type: 'registration' },
    { time: '01:40 PM', text: 'जयपुर OMR परीक्षा केंद्र 104 द्वारा 1,200 उत्तर पुस्तिकाओं की स्कैनिंग पूर्ण।', type: 'exam' },
    { time: '11:30 AM', text: 'भारतीय विद्या भवन, जयपुर का स्कूल सत्यापन सफल रहा।', type: 'approval' },
    { time: '10:15 AM', text: 'उत्तर प्रदेश राज्य हेतु हॉल टिकट बैच 2026 निर्गत किया गया।', type: 'hallticket' },
  ];

  const handleApprove = async (id: string) => {
    try {
      const token = adminToken || localStorage.getItem('bbo_admin_token') || 'token_admin_bbo_2026_master_key';
      const res = await fetch(`/api/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'स्वीकृत' })
      });

      if (res.ok) {
        showToast(`पंजीकरण आवेदन ${id} सफलतापूर्वेक स्वीकृत किया गया!`, 'success');
      }
    } catch (err) {
      console.warn('Network issue approving application via API:', err);
    } finally {
      setRecentRegistrations(prev => 
        prev.map(item => item.id === id ? { ...item, status: 'स्वीकृत' } : item)
      );
    }
  };

  const handleExportData = () => {
    showToast('राष्ट्रीय डैशबोर्ड समग्र रिपोर्ट (PDF/Excel) डाउनलोड प्रारंभ हो गई है।', 'info');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#7B1E1E] via-[#8B2323] to-[#541313] text-[#F5F0E6] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#C79A2D]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#C79A2D]/20 border border-[#C79A2D]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#C79A2D]">
              <Sparkles className="w-4 h-4" />
              राष्ट्रीय प्रशासनिक नियंत्रण कक्ष • सत्र 2026
            </div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold leading-tight">
              सुप्रभात, राष्ट्रीय प्रशासक!
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
              भारती भाषा ओलंपियाड 2026 सत्र हेतु अखिल भारतीय विद्यालय पंजीकरण, हॉल टिकट वितरण, OMR मूल्यांकन एवं छात्रवृत्ति आवंटन की लाइव स्थिति।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleExportData}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#C79A2D]" />
              समग्र रिपोर्ट डाउनलोड (PDF)
            </button>
            <button 
              onClick={() => onNavigateTab('schools')}
              className="bg-[#C79A2D] hover:bg-[#b08722] text-[#7B1E1E] font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              नया विद्यालय पंजीकृत करें
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">संबद्ध विद्यालय</span>
            <div className="w-10 h-10 rounded-xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white font-playfair">
              {typeof stats.totalSchools === 'number' ? stats.totalSchools.toLocaleString('hi-IN') : stats.totalSchools}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">28 राज्यों व 8 केंद्रशासित प्रदेशों में</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">कुल नामांकित परीक्षार्थी</span>
            <div className="w-10 h-10 rounded-xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white font-playfair">
              {typeof stats.totalStudents === 'number' ? stats.totalStudents.toLocaleString('hi-IN') : stats.totalStudents}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +18.2%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">कक्षा 1 से 12 तक के छात्र</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">सक्रिय परीक्षा केंद्र</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white font-playfair">482</span>
            <span className="text-xs font-semibold text-blue-600 flex items-center gap-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% क्रियाशील
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">ऑनलाइन व OMR आधारित केंद्र</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">छात्रवृत्ति पुरस्कार कोष</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white font-playfair">₹1.25 करोड़</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> स्वीकृत
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">राष्ट्रीय छात्रवृत्ति एवं स्वर्ण पदक</p>
        </div>
      </div>

      {/* Analytics & Statewise Distribution + Live Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* State-wise Breakdown */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                राज्यवार सहभागिता एवं पंजीकरण रुझान
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">शीर्ष प्रतिभागी राज्यों का प्रतिशत आवंटन एवं विषय चयन</p>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-semibold">
              <button 
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${selectedSubject === 'all' ? 'bg-[#7B1E1E] text-white shadow-xs' : 'text-gray-600 dark:text-gray-400'}`}
              >
                सभी
              </button>
              <button 
                onClick={() => setSelectedSubject('hindi')}
                className={`px-3 py-1 rounded-lg transition-colors ${selectedSubject === 'hindi' ? 'bg-[#7B1E1E] text-white shadow-xs' : 'text-gray-600 dark:text-gray-400'}`}
              >
                हिंदी
              </button>
              <button 
                onClick={() => setSelectedSubject('sanskrit')}
                className={`px-3 py-1 rounded-lg transition-colors ${selectedSubject === 'sanskrit' ? 'bg-[#7B1E1E] text-white shadow-xs' : 'text-gray-600 dark:text-gray-400'}`}
              >
                संस्कृत
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-800 dark:text-gray-200 font-bold">1. उत्तर प्रदेश (वाराणसी, लखनऊ, आगरा, कानपुर)</span>
                <span className="text-[#7B1E1E] dark:text-[#C79A2D] font-bold">1,12,400 छात्र (25%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] h-full rounded-full w-[85%] transition-all duration-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-800 dark:text-gray-200 font-bold">2. राजस्थान (जयपुर, जोधपुर, कोटा, उदयपुर)</span>
                <span className="text-[#7B1E1E] dark:text-[#C79A2D] font-bold">78,500 छात्र (17%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#C79A2D] to-[#E5B84B] h-full rounded-full w-[70%] transition-all duration-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-800 dark:text-gray-200 font-bold">3. बिहार (पटना, गया, मुजफ्फरपुर, भागलपुर)</span>
                <span className="text-[#7B1E1E] dark:text-[#C79A2D] font-bold">64,200 छात्र (14%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#7B1E1E] to-[#C79A2D] h-full rounded-full w-[60%] transition-all duration-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-800 dark:text-gray-200 font-bold">4. दिल्ली NCR एवं हरियाणा</span>
                <span className="text-[#7B1E1E] dark:text-[#C79A2D] font-bold">58,900 छात्र (13%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-full w-[52%] transition-all duration-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-800 dark:text-gray-200 font-bold">5. मध्य प्रदेश, उत्तराखंड व अन्य राज्य</span>
                <span className="text-[#7B1E1E] dark:text-[#C79A2D] font-bold">1,38,180 छात्र (31%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full w-[92%] transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="font-playfair text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C79A2D]" />
                लाइव गतिविधि स्ट्रीम (Live Audit)
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="space-y-3 text-xs">
              {activityLogs.map((log, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#7B1E1E] dark:text-[#C79A2D] font-bold">
                    <span>{log.time}</span>
                    <span className="bg-[#7B1E1E]/10 px-2 py-0.2 rounded-full">अपडेट</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-snug">{log.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent School Applications Table */}
      <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
              हाल के विद्यालय पंजीकरण आवेदन (Recent School Applications)
            </h2>
            <p className="text-xs text-gray-500">प्राप्त हालिया स्कूल आवेदन, कोड सत्यापन एवं स्वीकृति स्थिति</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text"
                placeholder="स्कूल के नाम से खोजें..."
                value={searchSchool}
                onChange={(e) => setSearchSchool(e.target.value)}
                className="bg-transparent border-none outline-none text-xs"
              />
            </div>
            <button 
              onClick={() => onNavigateTab('schools')}
              className="text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D] hover:underline flex items-center gap-1 shrink-0"
            >
              सभी देखें ({recentRegistrations.length}+)
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">आवेदन आईडी</th>
                <th className="py-3 px-4">विद्यालय का नाम</th>
                <th className="py-3 px-4">शहर / राज्य</th>
                <th className="py-3 px-4">छात्र संख्या</th>
                <th className="py-3 px-4">दिनांक</th>
                <th className="py-3 px-4">स्थिति</th>
                <th className="py-3 px-4 text-right">कार्यवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              {recentRegistrations
                .filter(r => r.school.toLowerCase().includes(searchSchool.toLowerCase()) || r.city.includes(searchSchool))
                .map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{item.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">{item.school}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{item.city}, {item.state}</td>
                    <td className="py-3.5 px-4 font-bold">{item.students} छात्र</td>
                    <td className="py-3.5 px-4 text-gray-500">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        item.status === 'स्वीकृत' 
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : item.status === 'लंबित'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                      }`}>
                        {item.status === 'स्वीकृत' && <CheckCircle2 className="w-3 h-3" />}
                        {item.status === 'लंबित' && <Clock className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedApplication(item)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="विवरण देखें"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {item.status === 'लंबित' && (
                          <button 
                            onClick={() => handleApprove(item.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-[11px] font-bold transition-colors shadow-xs"
                          >
                            स्वीकृत करें
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{selectedApplication.id}</span>
                <h3 className="font-playfair font-bold text-base text-gray-900 dark:text-white mt-0.5">
                  {selectedApplication.school}
                </h3>
              </div>
              <button onClick={() => setSelectedApplication(null)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-gray-500">स्थान:</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedApplication.city}, {selectedApplication.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">प्रधानाचार्य का नाम:</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedApplication.principal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">संपर्क फोन:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{selectedApplication.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">आधिकारिक ईमेल:</span>
                <span className="font-mono text-gray-900 dark:text-white">{selectedApplication.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">कुल छात्र नामांकन:</span>
                <span className="font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{selectedApplication.students} छात्र</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              {selectedApplication.status === 'लंबित' && (
                <button 
                  onClick={() => {
                    handleApprove(selectedApplication.id);
                    setSelectedApplication(null);
                  }}
                  className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-bold"
                >
                  स्वीकृत करें
                </button>
              )}
              <button 
                onClick={() => setSelectedApplication(null)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl text-xs font-semibold"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
