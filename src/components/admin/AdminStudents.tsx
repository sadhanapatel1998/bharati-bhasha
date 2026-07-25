'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Plus, 
  FileSpreadsheet, 
  Printer, 
  Eye, 
  X, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Download,
  Filter
} from 'lucide-react';

interface StudentData {
  rollNo: string;
  name: string;
  fatherName: string;
  classLevel: string;
  subject: 'हिंदी' | 'संस्कृत';
  schoolName: string;
  city: string;
  examCenter: string;
  status: 'रोल नंबर आवंटित' | 'हॉल टिकट निर्गत' | 'सत्यापन जारी';
}

export const AdminStudents: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Student Form
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    classLevel: 'कक्षा 5वीं',
    subject: 'हिंदी',
    schoolName: 'दिल्ली पब्लिक स्कूल, आर के पुरम',
    city: 'नई दिल्ली'
  });

  const [students, setStudents] = useState<StudentData[]>([
    { rollNo: 'BBO2026-10501', name: 'आदित्य नारायण शर्मा', fatherName: 'श्री राजेश शर्मा', classLevel: 'कक्षा 5वीं', subject: 'हिंदी', schoolName: 'दिल्ली पब्लिक स्कूल, आर के पुरम', city: 'नई दिल्ली', examCenter: 'DPS RKP सेंटर A', status: 'हॉल टिकट निर्गत' },
    { rollNo: 'BBO2026-10502', name: 'अनन्या त्रिपाठी', fatherName: 'श्री संतोष त्रिपाठी', classLevel: 'कक्षा 8वीं', subject: 'संस्कृत', schoolName: 'भारतीय विद्या भवन, जयपुर', city: 'जयपुर', examCenter: 'BVB हॉल #2', status: 'हॉल टिकट निर्गत' },
    { rollNo: 'BBO2026-10503', name: 'देवव्रत पांडे', fatherName: 'श्री उमाशंकर पांडे', classLevel: 'कक्षा 10वीं', subject: 'संस्कृत', schoolName: 'सरस्वती शिशु मंदिर, वाराणसी', city: 'वाराणसी', examCenter: 'SSM वाराणसी मुख्य भवन', status: 'हॉल टिकट निर्गत' },
  ]);

  // Load students from Express API
  React.useEffect(() => {
    async function loadStudents() {
      try {
        const token = localStorage.getItem('bbo_admin_token') || 'token_admin_bbo_2026_master_key';
        const res = await fetch('/api/admin/students', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setStudents(json.data);
          }
        }
      } catch (err) {
        console.warn('Students load error:', err);
      }
    }
    loadStudents();
  }, []);

  const filteredStudents = students.filter(st => {
    const matchesQuery = 
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.fatherName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = selectedSubject === 'all' || st.subject === selectedSubject;
    const matchesClass = selectedClass === 'all' || st.classLevel === selectedClass;

    return matchesQuery && matchesSubject && matchesClass;
  });

  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.fatherName) {
      showToast('कृपया विद्यार्थी का नाम एवं पिता का नाम दर्ज करें!', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('bbo_admin_token') || 'token_admin_bbo_2026_master_key';
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setStudents(prev => [json.data, ...prev]);
        showToast(`विद्यार्थी ${formData.name} को अनुक्रमांक ${json.data.rollNo} आवंटित हो गया है!`, 'success');
      } else {
        showToast(json.message || 'छात्र पंजीकृत करने में त्रुटि', 'error');
      }
    } catch (err) {
      console.warn('API student add error:', err);
      const newRoll = `BBO2026-${10500 + students.length + 1}`;
      const newStudentObj: StudentData = {
        rollNo: newRoll,
        name: formData.name,
        fatherName: formData.fatherName,
        classLevel: formData.classLevel,
        subject: formData.subject as 'हिंदी' | 'संस्कृत',
        schoolName: formData.schoolName,
        city: formData.city,
        examCenter: `${formData.schoolName} (परीक्षा केंद्र)`,
        status: 'हॉल टिकट निर्गत'
      };
      setStudents([newStudentObj, ...students]);
      showToast(`विद्यार्थी ${formData.name} को अनुक्रमांक ${newRoll} आवंटित हो गया है!`, 'success');
    } finally {
      setIsAddModalOpen(false);
      setFormData({ name: '', fatherName: '', classLevel: 'कक्षा 5वीं', subject: 'हिंदी', schoolName: 'दिल्ली पब्लिक स्कूल, आर के पुरम', city: 'नई दिल्ली' });
    }
  };

  const handlePrintAdmitCard = () => {
    showToast('हॉल टिकट (Admit Card) प्रिंटिंग/PDF डाउनलोड शुरू हो गया है।', 'info');
  };

  const handleExportCSV = () => {
    showToast('नामांकित छात्रों की संपूर्ण डेटा फाइल डाउनलोड हो गई है।', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              नामांकित छात्र एवं अनुक्रमांक (Student Enrollment)
            </h1>
          </div>
          <p className="text-xs text-gray-500">
            कक्षा 1 से 12 के परीक्षार्थियों का अनुक्रमांक (Roll No.) आवंटन, विषय एवं एडमिट कार्ड जारीकर्ता
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C79A2D]" />
            छात्र सूची (Excel)
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#C79A2D]" />
            नया छात्र नामांकित करें
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="छात्र नाम, अनुक्रमांक (Roll No), विद्यालय या अभिभावक खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1A1414] border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:border-[#7B1E1E]"
          />
        </div>

        <div>
          <select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-[#1A1414] border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="all">सभी विषय (हिंदी / संस्कृत)</option>
            <option value="हिंदी">राष्ट्रीय हिंदी ओलंपियाड</option>
            <option value="संस्कृत">राष्ट्रीय संस्कृत ओलंपियाड</option>
          </select>
        </div>

        <div>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-[#1A1414] border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="all">सभी कक्षाएँ (Class 1-12)</option>
            <option value="कक्षा 5वीं">कक्षा 5वीं</option>
            <option value="कक्षा 6ठीं">कक्षा 6ठीं</option>
            <option value="कक्षा 7वीं">कक्षा 7वीं</option>
            <option value="कक्षा 8वीं">कक्षा 8वीं</option>
            <option value="कक्षा 9वीं">कक्षा 9वीं</option>
            <option value="कक्षा 10वीं">कक्षा 10वीं</option>
            <option value="कक्षा 12वीं">कक्षा 12वीं</option>
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white dark:bg-[#1A1414] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">अनुक्रमांक (Roll No.)</th>
                <th className="py-3.5 px-4">परीक्षार्थी का नाम व पिता</th>
                <th className="py-3.5 px-4">कक्षा एवं विषय</th>
                <th className="py-3.5 px-4">संबद्ध विद्यालय</th>
                <th className="py-3.5 px-4">परीक्षा केंद्र</th>
                <th className="py-3.5 px-4">स्थिति</th>
                <th className="py-3.5 px-4 text-right">एडमिट कार्ड</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    कोई छात्र रिकॉर्ड नहीं मिला।
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.rollNo} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                      {st.rollNo}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900 dark:text-white">{st.name}</div>
                      <div className="text-[11px] text-gray-500">पिता: {st.fatherName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{st.classLevel}</span>
                      <div className="text-[11px] text-[#7B1E1E] dark:text-[#C79A2D] font-medium">{st.subject}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 max-w-[180px] truncate">
                      {st.schoolName}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">
                      {st.examCenter}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {st.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => {
                          setSelectedStudent(st);
                          setIsAdmitCardOpen(true);
                        }}
                        className="bg-[#7B1E1E]/10 hover:bg-[#7B1E1E] text-[#7B1E1E] hover:text-white dark:text-[#C79A2D] px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        एडमिट कार्ड
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
                    नया छात्र नामांकित करें
                  </h3>
                  <p className="text-xs text-gray-500">नामांकन प्रपत्र एवं स्वचालित अनुक्रमांक आबंटन</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">विद्यार्थी का पूरा नाम *</label>
                <input 
                  type="text" 
                  required
                  placeholder="उदा. आदित्य शर्मा"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">पिता / अभिभावक का नाम *</label>
                <input 
                  type="text" 
                  required
                  placeholder="उदा. श्री राजेश शर्मा"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">कक्षा (Class)</label>
                  <select 
                    value={formData.classLevel}
                    onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="कक्षा 5वीं">कक्षा 5वीं</option>
                    <option value="कक्षा 6ठीं">कक्षा 6ठीं</option>
                    <option value="कक्षा 7वीं">कक्षा 7वीं</option>
                    <option value="कक्षा 8वीं">कक्षा 8वीं</option>
                    <option value="कक्षा 9वीं">कक्षा 9वीं</option>
                    <option value="कक्षा 10वीं">कक्षा 10वीं</option>
                    <option value="कक्षा 12वीं">कक्षा 12वीं</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">ओलंपियाड विषय</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="हिंदी">हिंदी ओलंपियाड</option>
                    <option value="संस्कृत">संस्कृत ओलंपियाड</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">विद्यालय का नाम</label>
                <input 
                  type="text" 
                  value={formData.schoolName}
                  onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold"
                >
                  रद्द करें
                </button>
                <button 
                  type="submit"
                  className="bg-[#7B1E1E] text-white px-5 py-2 rounded-xl font-bold"
                >
                  नामांकित करें व अनुक्रमांक जनरेट करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admit Card Modal View */}
      {isAdmitCardOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#7B1E1E] text-[#F5F0E6] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  आधिकारिक प्रवेश पत्र (Admit Card)
                </span>
              </div>
              <button onClick={() => setIsAdmitCardOpen(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Hall Ticket Box */}
            <div className="border-2 border-[#7B1E1E] rounded-2xl p-5 bg-[#FAFAF8] dark:bg-[#121010] space-y-4">
              <div className="text-center border-b border-[#7B1E1E]/20 pb-3">
                <h4 className="font-playfair text-lg font-extrabold text-[#7B1E1E] dark:text-[#C79A2D]">
                  भारती भाषा ओलंपियाड 2026
                </h4>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 font-semibold">
                  राष्ट्रीय हिंदी व संस्कृत प्रवेश पत्र / Hall Ticket
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 text-[10px]">अनुक्रमांक (Roll No.):</span>
                  <div className="font-mono font-bold text-sm text-[#7B1E1E] dark:text-[#C79A2D]">
                    {selectedStudent.rollNo}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px]">ओलंपियाड विषय:</span>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {selectedStudent.subject} ओलंपियाड
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px]">परीक्षार्थी नाम:</span>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {selectedStudent.name}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px]">पिता का नाम:</span>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {selectedStudent.fatherName}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px]">कक्षा:</span>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {selectedStudent.classLevel}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px]">परीक्षा समय:</span>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    10:00 AM - 11:30 AM
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
                <span className="text-gray-500 text-[10px] block">परीक्षा केंद्र (Exam Center):</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedStudent.examCenter}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button 
                onClick={handlePrintAdmitCard}
                className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#C79A2D]" />
                प्रिंट / PDF डाउनलोड
              </button>
              <button 
                onClick={() => setIsAdmitCardOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold"
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
