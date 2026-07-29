// In-Memory Database Store & Data Models for Bharati Bhasha Olympiad Admin Portal

export interface SchoolModel {
  id: string;
  code: string;
  name: string;
  principal: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  enrolledStudents: number;
  status: 'सक्रिय' | 'सत्यापन जारी' | 'अस्वीकृत' | 'निलंबित';
  registeredDate: string;
  board: string;
}

export interface RegistrationModel {
  id: string;
  schoolName: string;
  principalName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  studentCount: number;
  subjects: string[];
  appliedDate: string;
  status: 'लंबित' | 'स्वीकृत' | 'अस्वीकृत' | 'सत्यापन जारी';
  feePaid: number;
  paymentStatus: 'सफल' | 'प्रक्रियाधीन' | 'बकाया';
  utrNo?: string;
}

export interface AnnouncementModel {
  id: string;
  title: string;
  category: string;
  targetAudience: string;
  date: string;
  views: number;
  status: 'प्रकाशित' | 'ड्राफ्ट' | 'अभिलेखागार';
  content: string;
}

export interface StudentModel {
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

export interface ContactQueryModel {
  id: string;
  name: string;
  role: string;
  schoolOrCity: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'प्रतीक्षारत (Pending)' | 'निस्तारित (Resolved)';
  reply?: string;
}

// Initial Mock Seed Data
const initialSchools: SchoolModel[] = [
  { id: 'SCH-101', code: 'BBO-DEL-01', name: 'दिल्ली पब्लिक विद्यालय, आर के पुरम', principal: 'डॉ. अलोक नाथ', phone: '+91 98765 43210', email: 'dps.rkp@edu.in', city: 'नई दिल्ली', state: 'दिल्ली', address: 'सेक्टर 12, आर के पुरम', pincode: '110022', enrolledStudents: 420, status: 'सक्रिय', registeredDate: '12 मार्च 2026', board: 'CBSE' },
  { id: 'SCH-102', code: 'BBO-RAJ-04', name: 'भारतीय विद्या भवन, जयपुर', principal: 'श्रीमती सुनीता शर्मा', phone: '+91 98123 45678', email: 'bvb.jaipur@edu.in', city: 'जयपुर', state: 'राजस्थान', address: 'केएम मुंशी मार्ग, जयपुर', pincode: '302015', enrolledStudents: 280, status: 'सक्रिय', registeredDate: '15 अप्रैल 2026', board: 'CBSE' },
  { id: 'SCH-103', code: 'BBO-[#JHK-02]', name: 'सेंट जेवियर्स विद्यालय, रांची', principal: 'फादर थॉमस', phone: '+91 94321 09876', email: 'stxaviers.ranchi@edu.in', city: 'रांची', state: 'झारखंड', address: 'डॉ. कामिल बुल्के पथ, रांची', pincode: '834001', enrolledStudents: 195, status: 'सक्रिय', registeredDate: '02 मई 2026', board: 'ICSE' },
  { id: 'SCH-104', code: 'BBO-UP-12', name: 'सरस्वती शिशु मंदिर, वाराणसी', principal: 'श्री मयंक त्रिपाठी', phone: '+91 97654 32109', email: 'ssm.vns@edu.in', city: 'वाराणसी', state: 'उत्तर प्रदेश', address: 'लंका चौराहा, वाराणसी', pincode: '221005', enrolledStudents: 310, status: 'सक्रिय', registeredDate: '10 मई 2026', board: 'UP Board' },
  { id: 'SCH-105', code: 'BBO-BIH-08', name: 'केंद्रीय विद्यालय, पटना', principal: 'डॉ. के. के. सिंह', phone: '+91 91234 56789', email: 'kv.patna@edu.in', city: 'पटना', state: 'बिहार', address: 'कंकड़बाग, पटना', pincode: '800020', enrolledStudents: 510, status: 'सत्यापन जारी', registeredDate: '22 जुलाई 2026', board: 'CBSE' },
];

const initialRegistrations: RegistrationModel[] = [
  { id: 'REG-1092', schoolName: 'दिल्ली पब्लिक विद्यालय, आर के पुरम', principalName: 'डॉ. अलोक नाथ', phone: '+91 98765 43210', email: 'dps.rkp@edu.in', city: 'नई दिल्ली', state: 'दिल्ली', studentCount: 420, subjects: ['हिन्दी', 'संस्कृत'], appliedDate: '25 जुलाई 2026, 02:15 PM', status: 'लंबित', feePaid: 63000, paymentStatus: 'सफल', utrNo: 'UTR982301923812' },
  { id: 'REG-1091', schoolName: 'भारतीय विद्या भवन, जयपुर', principalName: 'श्रीमती सुनीता शर्मा', phone: '+91 98123 45678', email: 'bvb.jaipur@edu.in', city: 'जयपुर', state: 'राजस्थान', studentCount: 280, subjects: ['हिन्दी'], appliedDate: '25 जुलाई 2026, 11:30 AM', status: 'स्वीकृत', feePaid: 42000, paymentStatus: 'सफल', utrNo: 'UTR871239812391' },
  { id: 'REG-1090', schoolName: 'सेंट जेवियर्स विद्यालय, रांची', principalName: 'फादर थॉमस', phone: '+91 94321 09876', email: 'stxaviers.ranchi@edu.in', city: 'रांची', state: 'झारखंड', studentCount: 195, subjects: ['संस्कृत'], appliedDate: '24 जुलाई 2026, 05:40 PM', status: 'स्वीकृत', feePaid: 29250, paymentStatus: 'सफल', utrNo: 'UTR348912098312' },
  { id: 'REG-1089', schoolName: 'सरस्वती शिशु मंदिर, वाराणसी', principalName: 'श्री मयंक त्रिपाठी', phone: '+91 97654 32109', email: 'ssm.vns@edu.in', city: 'वाराणसी', state: 'उत्तर प्रदेश', studentCount: 310, subjects: ['हिन्दी', 'संस्कृत'], appliedDate: '24 जुलाई 2026, 03:10 PM', status: 'स्वीकृत', feePaid: 46500, paymentStatus: 'सफल', utrNo: 'UTR102938475612' },
];

const initialAnnouncements: AnnouncementModel[] = [
  { id: 'ANN-301', title: 'भारती भाषा ओलंपियाड 2026 परीक्षा तिथियों की आधिकारिक घोषणा', category: 'परीक्षा सूचना', targetAudience: 'सभी विद्यालय एवं छात्र', date: '20 जुलाई 2026', views: 4250, status: 'प्रकाशित', content: 'सत्र 2026 की राष्ट्रीय हिंदी व संस्कृत ओलंपियाड परीक्षा 15 अक्टूबर 2026 को आयोजित की जाएगी।' },
  { id: 'ANN-302', title: 'विद्यालयों हेतु OMR उत्तर पुस्तिका स्कैनिंग दिशा-निर्देश जारी', category: 'विद्यालय गाइडलाइन', targetAudience: 'विद्यालय कोऑर्डिनेटर', date: '18 जुलाई 2026', views: 2890, status: 'प्रकाशित', content: 'परीक्षा केंद्रों पर OMR शीट की स्कैनिंग एवं अपलोड प्रक्रिया का विस्तृत मैन्युअल डाउनलोड करें।' },
  { id: 'ANN-303', title: 'राष्ट्रीय स्तर की छात्रवृत्ति ₹1.25 करोड़ कोष आवंटन नियमावली', category: 'छात्रवृत्ति', targetAudience: 'मेधावी छात्र', date: '12 जुलाई 2026', views: 6100, status: 'प्रकाशित', content: 'स्वर्ण, रजत व कांस्य पदक विजेताओं हेतु नगद छात्रवृत्ति वितरण नियमों का विवरण प्रकाशित।' },
];

const initialQueries: ContactQueryModel[] = [
  { id: 'QRY-801', name: 'डॉ. सुरेश चंद्र झा', role: 'विद्यालय प्रधानाचार्य', schoolOrCity: 'डीपीएस आर के पुरम, दिल्ली', phone: '+91 98102 34567', email: 'principal@dpsrkp.edu.in', subject: 'हॉल टिकट थोक (Bulk) डाउनलोड प्रक्रिया शंका', message: 'क्या हम एक साथ सभी 420 नामांकित छात्रों के प्रवेश पत्र एक फाइल में डाउनलोड कर सकते हैं?', date: 'आज, 11:20 AM', status: 'प्रतीक्षारत (Pending)' },
  { id: 'QRY-802', name: 'श्रीमती मीनाक्षी वर्मा', role: 'अभिभावक', schoolOrCity: 'जयपुर, राजस्थान', phone: '+91 94140 12345', email: 'meenakshi.v@gmail.com', subject: 'कक्षा 6 संस्कृत सैंपल पेपर उपलब्धता', message: 'कृपया कक्षा 6 संस्कृत ओलंपियाड के पिछले 3 वर्षों के प्रश्न पत्र उपलब्ध कराने की कृपा करें।', date: 'कल, 04:15 PM', status: 'निस्तारित (Resolved)', reply: 'सैंपल पेपर्स वेबसाइट के स्टडी मटीरियल सेक्शन में अपलोड कर दिए गए हैं।' },
];

const initialStudents: StudentModel[] = [
  { rollNo: 'BBO2026-10501', name: 'आदित्य नारायण शर्मा', fatherName: 'श्री राजेश शर्मा', classLevel: 'कक्षा 5वीं', subject: 'हिंदी', schoolName: 'दिल्ली पब्लिक विद्यालय, आर के पुरम', city: 'नई दिल्ली', examCenter: 'DPS RKP सेंटर A', status: 'हॉल टिकट निर्गत' },
  { rollNo: 'BBO2026-10502', name: 'अनन्या त्रिपाठी', fatherName: 'श्री संतोष त्रिपाठी', classLevel: 'कक्षा 8वीं', subject: 'संस्कृत', schoolName: 'भारतीय विद्या भवन, जयपुर', city: 'जयपुर', examCenter: 'BVB हॉल #2', status: 'हॉल टिकट निर्गत' },
  { rollNo: 'BBO2026-10503', name: 'देवव्रत पांडे', fatherName: 'श्री उमाशंकर पांडे', classLevel: 'कक्षा 10वीं', subject: 'संस्कृत', schoolName: 'सरस्वती शिशु मंदिर, वाराणसी', city: 'वाराणसी', examCenter: 'SSM वाराणसी मुख्य भवन', status: 'हॉल टिकट निर्गत' },
  { rollNo: 'BBO2026-10504', name: 'काव्या सिंह', fatherName: 'श्री महेंद्र सिंह', classLevel: 'कक्षा 6ठीं', subject: 'हिंदी', schoolName: 'सेंट जेवियर्स उच्च विद्यालय, रांची', city: 'रांची', examCenter: 'सेंट जेवियर्स ब्लॉक B', status: 'रोल नंबर आवंटित' },
  { rollNo: 'BBO2026-10505', name: 'हर्षवर्धन जोशी', fatherName: 'डॉ. नरेंद्र जोशी', classLevel: 'कक्षा 12वीं', subject: 'संस्कृत', schoolName: 'मेयो कॉलेज, अजमेर', city: 'अजमेर', examCenter: 'मेयो कॉलेज परीक्षा हॉल', status: 'हॉल टिकट निर्गत' },
];

// Data Store Class
export class DataStore {
  private schools: SchoolModel[] = [...initialSchools];
  private registrations: RegistrationModel[] = [...initialRegistrations];
  private announcements: AnnouncementModel[] = [...initialAnnouncements];
  private queries: ContactQueryModel[] = [...initialQueries];
  private students: StudentModel[] = [...initialStudents];
  private settings = {
    siteName: 'भारती भाषा ओलंपियाड (Bharati Bhasha Olympiad)',
    academicYear: '2026-27',
    registrationFee: 150,
    examDateHindi: '15 अक्टूबर 2026',
    examDateSanskrit: '18 अक्टूबर 2026',
    supportEmail: 'support@bharatibhasha.org',
    helplinePhone: '+91 11 2345 6789 / +91 98765 43210',
    maintenanceMode: false
  };

  // Schools CRUD
  getSchools() {
    return this.schools;
  }

  addSchool(school: Omit<SchoolModel, 'id' | 'code' | 'registeredDate'>) {
    const newSchool: SchoolModel = {
      ...school,
      id: `SCH-${100 + this.schools.length + 1}`,
      code: `BBO-${school.state.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
      registeredDate: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    this.schools.unshift(newSchool);
    return newSchool;
  }

  updateSchool(id: string, updates: Partial<SchoolModel>) {
    const index = this.schools.findIndex(s => s.id === id);
    if (index !== -1) {
      this.schools[index] = { ...this.schools[index], ...updates };
      return this.schools[index];
    }
    return null;
  }

  deleteSchool(id: string) {
    this.schools = this.schools.filter(s => s.id !== id);
    return true;
  }

  // Registrations CRUD
  getRegistrations() {
    return this.registrations;
  }

  updateRegistrationStatus(id: string, status: 'लंबित' | 'स्वीकृत' | 'अस्वीकृत' | 'सत्यापन जारी') {
    const reg = this.registrations.find(r => r.id === id);
    if (reg) {
      reg.status = status;
      // If approved, create/update school dynamically
      if (status === 'स्वीकृत') {
        const existing = this.schools.find(s => s.name === reg.schoolName);
        if (!existing) {
          this.addSchool({
            name: reg.schoolName,
            principal: reg.principalName,
            phone: reg.phone,
            email: reg.email,
            city: reg.city,
            state: reg.state,
            address: `${reg.city}, ${reg.state}`,
            pincode: '110001',
            enrolledStudents: reg.studentCount,
            status: 'सक्रिय',
            board: 'CBSE'
          });
        }
      }
      return reg;
    }
    return null;
  }

  // Announcements CRUD
  getAnnouncements() {
    return this.announcements;
  }

  addAnnouncement(item: Omit<AnnouncementModel, 'id' | 'views' | 'date'>) {
    const newAnn: AnnouncementModel = {
      ...item,
      id: `ANN-${300 + this.announcements.length + 1}`,
      views: 0,
      date: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    this.announcements.unshift(newAnn);
    return newAnn;
  }

  deleteAnnouncement(id: string) {
    this.announcements = this.announcements.filter(a => a.id !== id);
    return true;
  }

  // Contact Queries CRUD
  getQueries() {
    return this.queries;
  }

  replyQuery(id: string, replyText: string) {
    const q = this.queries.find(item => item.id === id);
    if (q) {
      q.reply = replyText;
      q.status = 'निस्तारित (Resolved)';
      return q;
    }
    return null;
  }

  // Students CRUD
  getStudents() {
    return this.students;
  }

  addStudent(student: Omit<StudentModel, 'rollNo' | 'examCenter' | 'status'>) {
    const rollNo = `BBO2026-${10500 + this.students.length + 1}`;
    const newStudent: StudentModel = {
      ...student,
      rollNo,
      examCenter: `${student.schoolName.split(',')[0]} परीक्षा केंद्र`,
      status: 'हॉल टिकट निर्गत'
    };
    this.students.unshift(newStudent);
    return newStudent;
  }

  deleteStudent(rollNo: string) {
    this.students = this.students.filter(s => s.rollNo !== rollNo);
    return true;
  }

  // Settings
  getSettings() {
    return this.settings;
  }

  updateSettings(newSettings: Partial<typeof this.settings>) {
    this.settings = { ...this.settings, ...newSettings };
    return this.settings;
  }

  // Dashboard Aggregated Stats
  getDashboardStats() {
    const totalEnrolled = this.schools.reduce((acc, curr) => acc + curr.enrolledStudents, 0) + 450000;
    return {
      totalSchools: this.schools.length + 2845,
      totalStudents: totalEnrolled,
      activeCenters: 482,
      scholarshipFund: '₹1.25 करोड़',
      pendingRegistrations: this.registrations.filter(r => r.status === 'लंबित').length,
      announcementsCount: this.announcements.length
    };
  }
}

export const dbStore = new DataStore();
