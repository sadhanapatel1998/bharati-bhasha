'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CreditCard, 
  FileCode2, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Eye, 
  Trash2, 
  Edit, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Receipt,
  Layers,
  Settings2
} from 'lucide-react';

interface SchoolApp {
  id: string;
  name: string;
  principal: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  studentsCount: number;
  paymentStatus: 'सफल (Paid)' | 'लंबित (Pending)' | 'विफल (Failed)';
  amount: number;
  appliedDate: string;
}

interface PaymentTransaction {
  txnId: string;
  entityName: string;
  type: 'विद्यालय पंजीकरण' | 'व्यक्तिगत छात्र';
  amount: number;
  method: 'UPI / QR' | 'नेट बैंकिंग' | 'क्रेडिट/डेबिट कार्ड';
  status: 'सफल' | 'प्रक्रियाधीन' | 'अस्वीकृत';
  timestamp: string;
}

interface FormField {
  id: string;
  labelHi: string;
  type: 'text' | 'number' | 'select' | 'file';
  required: boolean;
  active: boolean;
}

export const AdminRegistrations: React.FC<{ subTab?: string }> = ({ subTab = 'school-registrations' }) => {
  const { showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'school-registrations' | 'payments' | 'form-builder'>(
    (subTab as any) || 'school-registrations'
  );

  React.useEffect(() => {
    if (subTab) {
      setActiveSubTab(subTab as any);
    }
  }, [subTab]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState('all');

  // School Registrations Data
  const [schoolApps, setSchoolApps] = useState<SchoolApp[]>([
    { id: 'SCH-2026-089', name: 'दिल्ली पब्लिक स्कूल, आर के पुरम', principal: 'डॉ. एम. के. शर्मा', phone: '+91 98102 34567', email: 'dpsrkp@edu.in', state: 'दिल्ली', city: 'नई दिल्ली', studentsCount: 420, paymentStatus: 'सफल (Paid)', amount: 64500, appliedDate: '24 जुलाई 2026' },
    { id: 'SCH-2026-088', name: 'भारतीय विद्या भवन, जयपुर', principal: 'श्रीमती सुनीता राठौड़', phone: '+91 94140 12345', email: 'bvhjaipur@gmail.com', state: 'राजस्थान', city: 'जयपुर', studentsCount: 280, paymentStatus: 'सफल (Paid)', amount: 43500, appliedDate: '23 जुलाई 2026' },
    { id: 'SCH-2026-087', name: 'सरस्वती शिशु मंदिर, वाराणसी', principal: 'श्री देवेन्द्र पांडे', phone: '+91 94152 98765', email: 'ssmvaranasi@org.in', state: 'उत्तर प्रदेश', city: 'वाराणसी', studentsCount: 310, paymentStatus: 'सफल (Paid)', amount: 48000, appliedDate: '22 जुलाई 2026' },
    { id: 'SCH-2026-086', name: 'केंद्रीय विद्यालय, पटना', principal: 'श्री आर. के. वर्मा', phone: '+91 93341 55443', email: 'kvpatna@kvs.ac.in', state: 'बिहार', city: 'पटना', studentsCount: 510, paymentStatus: 'लंबित (Pending)', amount: 78000, appliedDate: '21 जुलाई 2026' },
    { id: 'SCH-2026-085', name: 'सेंट जेवियर्स सीनियर सेकेंडरी, रांची', principal: 'फादर थॉमस जे.', phone: '+91 98351 09876', email: 'stxaviersranchi@edu.in', state: 'झारखंड', city: 'रांची', studentsCount: 195, paymentStatus: 'सफल (Paid)', amount: 30750, appliedDate: '20 जुलाई 2026' },
  ]);

  // Payment Transactions Data
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    { txnId: 'TXN-98213401', entityName: 'दिल्ली पब्लिक स्कूल, आर के पुरम', type: 'विद्यालय पंजीकरण', amount: 64500, method: 'UPI / QR', status: 'सफल', timestamp: '24 जुलाई 2026, 02:45 PM' },
    { txnId: 'TXN-98213400', entityName: 'अभिषेक कुमार (कक्षा 8)', type: 'व्यक्तिगत छात्र', amount: 150, method: 'UPI / QR', status: 'सफल', timestamp: '24 जुलाई 2026, 01:12 PM' },
    { txnId: 'TXN-98213399', entityName: 'भारतीय विद्या भवन, जयपुर', type: 'विद्यालय पंजीकरण', amount: 43500, method: 'नेट बैंकिंग', status: 'सफल', timestamp: '23 जुलाई 2026, 11:30 AM' },
    { txnId: 'TXN-98213398', entityName: 'केंद्रीय विद्यालय, पटना', type: 'विद्यालय पंजीकरण', amount: 78000, method: 'क्रेडिट/डेबिट कार्ड', status: 'प्रक्रियाधीन', timestamp: '21 जुलाई 2026, 04:20 PM' },
    { txnId: 'TXN-98213397', entityName: 'प्रिया शर्मा (कक्षा 5)', type: 'व्यक्तिगत छात्र', amount: 150, method: 'UPI / QR', status: 'सफल', timestamp: '20 जुलाई 2026, 06:05 PM' },
  ]);

  // Form Fields State
  const [fields, setFields] = useState<FormField[]>([
    { id: 'f1', labelHi: 'विद्यार्थी का नाम (Student Full Name)', type: 'text', required: true, active: true },
    { id: 'f2', labelHi: 'पिता / अभिभावक का नाम', type: 'text', required: true, active: true },
    { id: 'f3', labelHi: 'कक्षा (Class 1 to 12)', type: 'select', required: true, active: true },
    { id: 'f4', labelHi: 'विषय चयन (हिंदी / संस्कृत / दोनों)', type: 'select', required: true, active: true },
    { id: 'f5', labelHi: 'विद्यालय कोड / नाम', type: 'text', required: true, active: true },
    { id: 'f6', labelHi: 'अभिभावक का मोबाइल नंबर (WhatsApp)', type: 'number', required: true, active: true },
    { id: 'f7', labelHi: 'पासपोर्ट आकार का फोटो अपलोड', type: 'file', required: false, active: true },
  ]);

  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'select' | 'file'>('text');

  const handleAddField = () => {
    if (!newFieldLabel.trim()) return;
    const newField: FormField = {
      id: `f-${Date.now()}`,
      labelHi: newFieldLabel,
      type: newFieldType,
      required: true,
      active: true
    };
    setFields([...fields, newField]);
    setNewFieldLabel('');
    showToast('नया पंजीकरण फ़ील्ड प्रपत्र में जोड़ दिया गया है!', 'success');
  };

  const handleToggleField = (id: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, active: !f.active } : f));
    showToast('फ़ील्ड स्थिति अद्यतन की गई।', 'info');
  };

  const handleApproveSchool = (id: string) => {
    setSchoolApps(schoolApps.map(s => s.id === id ? { ...s, paymentStatus: 'सफल (Paid)' } : s));
    showToast(`विद्यालय पंजीकरण ${id} स्वीकृत एवं सत्यापित किया गया।`, 'success');
  };

  const filteredSchools = schoolApps.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = filterState === 'all' || s.state === filterState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Header */}
      <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              पंजीकरण एवं प्रपत्र प्रबंधन (Registrations & Form Builder)
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            विद्यालय आवेदन पत्र समीक्षा, ऑनलाइन शुल्क लेनदेन लेखा एवं पंजीकरण फॉर्म निर्माण
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl text-xs font-semibold self-start md:self-auto">
          <button 
            onClick={() => setActiveSubTab('school-registrations')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'school-registrations' 
                ? 'bg-[#7B1E1E] text-white shadow-xs font-bold' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            विद्यालय पंजीकरण
          </button>
          <button 
            onClick={() => setActiveSubTab('payments')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'payments' 
                ? 'bg-[#7B1E1E] text-white shadow-xs font-bold' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            शुल्क एवं भुगतान
          </button>
          <button 
            onClick={() => setActiveSubTab('form-builder')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'form-builder' 
                ? 'bg-[#7B1E1E] text-white shadow-xs font-bold' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            प्रपत्र निर्माता (Form Builder)
          </button>
        </div>
      </div>

      {/* Sub Tab 1: School Registrations */}
      {activeSubTab === 'school-registrations' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#1A1414] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="विद्यालय का नाम, शहर या राज्य खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7B1E1E]"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <select 
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl text-xs font-semibold"
              >
                <option value="all">सभी राज्य (All States)</option>
                <option value="उत्तर प्रदेश">उत्तर प्रदेश</option>
                <option value="दिल्ली">दिल्ली</option>
                <option value="राजस्थान">राजस्थान</option>
                <option value="बिहार">बिहार</option>
                <option value="झारखंड">झारखंड</option>
              </select>

              <button 
                onClick={() => showToast('विद्यालय पंजीकरण सूची Excel प्रारूप में डाउनलोड हो गई है।', 'info')}
                className="bg-[#7B1E1E]/10 hover:bg-[#7B1E1E] text-[#7B1E1E] dark:text-[#C79A2D] hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                निर्यात करें (Export)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-[#1A1414] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-500 uppercase">
                    <th className="py-3.5 px-4">आवेदन कोड</th>
                    <th className="py-3.5 px-4">विद्यालय एवं प्रधानाचार्य</th>
                    <th className="py-3.5 px-4">स्थान / राज्य</th>
                    <th className="py-3.5 px-4">नामांकित छात्र</th>
                    <th className="py-3.5 px-4">भुगतान स्थिति</th>
                    <th className="py-3.5 px-4">आवेदन दिनांक</th>
                    <th className="py-3.5 px-4 text-right">कार्यवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                  {filteredSchools.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{s.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 dark:text-white">{s.name}</div>
                        <div className="text-[10px] text-gray-500">{s.principal} ({s.phone})</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300">{s.city}, {s.state}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{s.studentsCount} छात्र</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          s.paymentStatus.includes('सफल') 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {s.paymentStatus.includes('सफल') ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {s.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">{s.appliedDate}</td>
                      <td className="py-3.5 px-4 text-right">
                        {!s.paymentStatus.includes('सफल') ? (
                          <button 
                            onClick={() => handleApproveSchool(s.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-[10px] font-bold"
                          >
                            स्वीकृत करें
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-bold flex items-center justify-end gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> सत्यापित
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab 2: Payments & Revenue Ledger */}
      {activeSubTab === 'payments' && (
        <div className="space-y-6">
          {/* Revenue KPI Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
              <span className="text-xs font-bold text-gray-500">सत्र 2026 कुल प्राप्त शुल्क</span>
              <div className="text-2xl font-bold text-emerald-600 font-playfair">₹6,78,27,000</div>
              <p className="text-[10px] text-gray-400">2,850+ स्कूल व व्यक्तिगत छात्र भुगतान</p>
            </div>

            <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
              <span className="text-xs font-bold text-gray-500">प्रक्रियाधीन / लंबित राशि</span>
              <div className="text-2xl font-bold text-amber-600 font-playfair">₹1,56,000</div>
              <p className="text-[10px] text-gray-400">बैंक द्वारा सत्यापन की प्रतीक्षा में</p>
            </div>

            <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
              <span className="text-xs font-bold text-gray-500">विद्यालय प्रति-छात्र दर</span>
              <div className="text-2xl font-bold text-[#7B1E1E] dark:text-[#C79A2D] font-playfair">₹150 / छात्र</div>
              <p className="text-[10px] text-gray-400">अध्ययन सामग्री व प्रमाण पत्र सम्मिलित</p>
            </div>
          </div>

          {/* Transactions Ledger */}
          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
                  हालिया भुगतान बैंक लेजर (Live Payment Gateway Ledger)
                </h2>
                <p className="text-xs text-gray-500">UPI, QR एवं गेटवे रसीदें</p>
              </div>
              <button 
                onClick={() => showToast('बैंक रसीदें डाउनलोड कर दी गई हैं।', 'info')}
                className="bg-[#7B1E1E] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Receipt className="w-3.5 h-3.5 text-[#C79A2D]" />
                रसीद विवरण डाउनलोड
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-500 uppercase">
                    <th className="py-3 px-4">लेनदेन आईडी (Txn ID)</th>
                    <th className="py-3 px-4">भुगतानकर्ता</th>
                    <th className="py-3 px-4">प्रकार</th>
                    <th className="py-3 px-4">राशि (Amount)</th>
                    <th className="py-3 px-4">माध्यम</th>
                    <th className="py-3 px-4">स्थिति</th>
                    <th className="py-3 px-4">दिनांक व समय</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900 dark:text-white">{t.txnId}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-800 dark:text-gray-200">{t.entityName}</td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">{t.type}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 font-mono">₹{t.amount.toLocaleString('hi-IN')}</td>
                      <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300">{t.method}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'सफल' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 text-[11px]">{t.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab 3: Dynamic Form Builder */}
      {activeSubTab === 'form-builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder Controls */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
                पंजीकरण प्रपत्र फ़ील्ड अनुकूलन (Form Field Configurator)
              </h2>
              <p className="text-xs text-gray-500">विद्यार्थी एवं स्कूल पंजीकरण फॉर्म हेतु डायनेमिक फ़ील्ड जोड़ें या छिपाएं</p>
            </div>

            {/* Add New Field Box */}
            <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-gray-800 dark:text-gray-200">नया फ़ील्ड जोड़ें (Add Custom Input)</span>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input 
                  type="text"
                  placeholder="फ़ील्ड का नाम (उदा. आधार संख्या)"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  className="flex-1 w-full px-3.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
                <select 
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value as any)}
                  className="w-full sm:w-36 px-3.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold"
                >
                  <option value="text">पाठ (Text)</option>
                  <option value="number">संख्या (Number)</option>
                  <option value="select">चयन (Select)</option>
                  <option value="file">फ़ाइल (File Upload)</option>
                </select>
                <button 
                  onClick={handleAddField}
                  className="w-full sm:w-auto bg-[#7B1E1E] text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-1 shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#C79A2D]" />
                  जोड़ें
                </button>
              </div>
            </div>

            {/* Active Fields List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-500">वर्तमान सक्रिय फ़ील्ड्स</span>
              <div className="space-y-2">
                {fields.map((f) => (
                  <div key={f.id} className="flex items-center justify-between p-3.5 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#7B1E1E]"></div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{f.labelHi}</div>
                        <span className="text-[10px] text-gray-400 uppercase font-mono">{f.type} • {f.required ? 'अनिवार्य' : 'ऐच्छिक'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleToggleField(f.id)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-bold ${
                        f.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {f.active ? 'सक्रिय (Active)' : 'निष्क्रिय'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Live Preview */}
          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-playfair text-base font-bold text-[#7B1E1E] dark:text-[#C79A2D] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                लाइव फॉर्म पूर्वावलोकन (Live Form Preview)
              </h3>
              <p className="text-[11px] text-gray-500">परीक्षार्थी हेतु दृश्य स्वरूप</p>
            </div>

            <div className="space-y-3 text-xs">
              {fields.filter(f => f.active).map((f) => (
                <div key={f.id} className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    {f.labelHi} {f.required && <span className="text-red-500">*</span>}
                  </label>
                  <input 
                    disabled 
                    type={f.type === 'number' ? 'number' : 'text'}
                    placeholder={`${f.labelHi} प्रविष्ट करें...`}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-400 cursor-not-allowed"
                  />
                </div>
              ))}
              <button disabled className="w-full mt-2 bg-[#7B1E1E] opacity-70 text-white py-2.5 rounded-xl font-bold text-xs cursor-not-allowed">
                ऑनलाइन आवेदन जमा करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
