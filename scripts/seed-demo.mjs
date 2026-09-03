/**
 * Optional: seeds the schools/students/announcements that the old static admin
 * panel used to show, plus one sample sub-admin with limited permissions.
 * Safe to re-run — existing records are left alone.
 *
 *   npm run seed:demo
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';

for (const file of ['.env.local', '.env']) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = (m[2] || '').trim().replace(/^["']|["']$/g, '');
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI missing.');
  process.exit(1);
}

const loose = (name) =>
  mongoose.models[name] || mongoose.model(name, new mongoose.Schema({}, { strict: false, timestamps: true }));

const School = loose('School');
const Student = loose('Student');
const Announcement = loose('Announcement');
const Enquiry = loose('Enquiry');
const User = loose('User');

await mongoose.connect(MONGODB_URI, { family: 4 });
console.log('✅ MongoDB connected');

/* ---------------- schools (from the original admin mock data) ---------------- */
const schools = [
  { code: 'BBO-DL-0001', name: 'दिल्ली पब्लिक विद्यालय, आर के पुरम', principal: 'डॉ. अलोक नाथ', phone: '+91 98765 43210', email: 'dps.rkp@edu.in', city: 'नई दिल्ली', state: 'Delhi', address: 'सेक्टर 12, आर के पुरम', pincode: '110022', board: 'CBSE', status: 'active', subjects: ['hindi', 'sanskrit'] },
  { code: 'BBO-RA-0002', name: 'भारतीय विद्या भवन, जयपुर', principal: 'श्रीमती सुनीता शर्मा', phone: '+91 98123 45678', email: 'bvb.jaipur@edu.in', city: 'जयपुर', state: 'Rajasthan', address: 'केएम मुंशी मार्ग, जयपुर', pincode: '302015', board: 'CBSE', status: 'active', subjects: ['hindi'] },
  { code: 'BBO-JH-0003', name: 'सेंट जेवियर्स विद्यालय, रांची', principal: 'फादर थॉमस', phone: '+91 94321 09876', email: 'stxaviers.ranchi@edu.in', city: 'रांची', state: 'Jharkhand', address: 'डॉ. कामिल बुल्के पथ, रांची', pincode: '834001', board: 'ICSE', status: 'active', subjects: ['sanskrit'] },
  { code: 'BBO-UT-0004', name: 'सरस्वती शिशु मंदिर, वाराणसी', principal: 'श्री मयंक त्रिपाठी', phone: '+91 97654 32109', email: 'ssm.vns@edu.in', city: 'वाराणसी', state: 'Uttar Pradesh', address: 'लंका चौराहा, वाराणसी', pincode: '221005', board: 'State Board', status: 'active', subjects: ['hindi', 'sanskrit'] },
  { code: 'BBO-BI-0005', name: 'केंद्रीय विद्यालय, पटना', principal: 'डॉ. के. के. सिंह', phone: '+91 91234 56789', email: 'kv.patna@edu.in', city: 'पटना', state: 'Bihar', address: 'कंकड़बाग, पटना', pincode: '800020', board: 'CBSE', status: 'pending', subjects: ['hindi'] },
];

const schoolIds = {};
let schoolsCreated = 0;

for (const s of schools) {
  let doc = await School.findOne({ code: s.code });
  if (!doc) {
    doc = await School.create({
      ...s,
      studentCount: 0,
      session: '2026',
      approvedAt: s.status === 'active' ? new Date() : null,
    });
    schoolsCreated++;

    if (!(await User.findOne({ email: s.email }))) {
      await User.create({
        name: s.principal,
        email: s.email,
        phone: s.phone,
        passwordHash: await bcrypt.hash('school@123', 10),
        role: 'school',
        designation: 'School Coordinator',
        permissions: [],
        schoolId: doc._id,
        isActive: s.status !== 'suspended',
      });
    }
  }
  schoolIds[s.code] = doc._id;
}

/* ---------------- students ---------------- */
const students = [
  { rollNo: 'BBO26-000001', name: 'आर्यन शर्मा', fatherName: 'श्री राजेश शर्मा', classLevel: '8', subject: 'hindi', school: 'BBO-DL-0001', examCenter: 'DPS RK Puram' },
  { rollNo: 'BBO26-000002', name: 'साक्षी वर्मा', fatherName: 'श्री अनिल वर्मा', classLevel: '9', subject: 'sanskrit', school: 'BBO-DL-0001', examCenter: 'DPS RK Puram' },
  { rollNo: 'BBO26-000003', name: 'ऋषभ मेहता', fatherName: 'श्री सुनील मेहता', classLevel: '7', subject: 'both', school: 'BBO-RA-0002', examCenter: 'BVB Jaipur' },
  { rollNo: 'BBO26-000004', name: 'अनन्या सिंह', fatherName: 'श्री विवेक सिंह', classLevel: '10', subject: 'hindi', school: 'BBO-RA-0002', examCenter: 'BVB Jaipur' },
  { rollNo: 'BBO26-000005', name: 'कार्तिक तिवारी', fatherName: 'श्री मोहन तिवारी', classLevel: '6', subject: 'sanskrit', school: 'BBO-JH-0003', examCenter: "St Xavier's Ranchi" },
  { rollNo: 'BBO26-000006', name: 'ईशा पांडेय', fatherName: 'श्री दिनेश पांडेय', classLevel: '9', subject: 'both', school: 'BBO-UT-0004', examCenter: 'SSM Varanasi' },
];

let studentsCreated = 0;
for (const st of students) {
  if (await Student.findOne({ rollNo: st.rollNo })) continue;
  const schoolId = schoolIds[st.school];
  const school = schools.find((s) => s.code === st.school);
  await Student.create({
    rollNo: st.rollNo,
    name: st.name,
    fatherName: st.fatherName,
    classLevel: st.classLevel,
    subject: st.subject,
    schoolId,
    schoolName: school.name,
    examCenter: st.examCenter,
    status: 'rollAllotted',
    session: '2026',
  });
  await School.updateOne({ _id: schoolId }, { $inc: { studentCount: 1 } });
  studentsCreated++;
}

/* ---------------- announcements ---------------- */
const announcements = [
  {
    title: 'Bharati Bhasha Olympiad 2026 exam dates announced',
    titleHi: 'भारती भाषा ओलंपियाड 2026 परीक्षा तिथियों की आधिकारिक घोषणा',
    body: 'The national Hindi and Sanskrit olympiad for session 2026 will be conducted in October 2026.',
    bodyHi: 'सत्र 2026 की राष्ट्रीय हिंदी व संस्कृत ओलंपियाड परीक्षा अक्टूबर 2026 में आयोजित की जाएगी।',
    category: 'exam',
    audience: 'all',
  },
  {
    title: 'OMR scanning guidelines released for schools',
    titleHi: 'विद्यालयों हेतु OMR उत्तर पुस्तिका स्कैनिंग दिशा-निर्देश जारी',
    body: 'A detailed manual for scanning and uploading OMR sheets at exam centres is now available.',
    bodyHi: 'परीक्षा केंद्रों पर OMR शीट की स्कैनिंग एवं अपलोड प्रक्रिया का विस्तृत मैन्युअल उपलब्ध है।',
    category: 'guideline',
    audience: 'schools',
  },
  {
    title: 'National scholarship fund allocation rules published',
    titleHi: 'राष्ट्रीय स्तर की छात्रवृत्ति कोष आवंटन नियमावली प्रकाशित',
    body: 'Cash scholarship distribution rules for gold, silver and bronze medallists are now published.',
    bodyHi: 'स्वर्ण, रजत व कांस्य पदक विजेताओं हेतु नगद छात्रवृत्ति वितरण नियम प्रकाशित।',
    category: 'scholarship',
    audience: 'students',
  },
];

let annCreated = 0;
for (const a of announcements) {
  if (await Announcement.findOne({ title: a.title })) continue;
  await Announcement.create({ ...a, isPublished: true, views: 0 });
  annCreated++;
}

/* ---------------- enquiries ---------------- */
const enquiries = [
  { name: 'डॉ. सुरेश चंद्र झा', role: 'Principal', schoolOrCity: 'DPS RK Puram, Delhi', phone: '+91 98102 34567', email: 'principal@dpsrkp.edu.in', subject: 'Bulk hall ticket download', message: 'Can we download admit cards for all enrolled students in one file?', status: 'pending' },
  { name: 'श्रीमती मीनाक्षी वर्मा', role: 'Parent', schoolOrCity: 'Jaipur, Rajasthan', phone: '+91 94140 12345', email: 'meenakshi.v@example.com', subject: 'Class 6 Sanskrit sample papers', message: 'Please share the last 3 years of Sanskrit olympiad papers for class 6.', status: 'resolved', reply: 'Sample papers are available in the study material section.' },
];

let enqCreated = 0;
for (const e of enquiries) {
  if (await Enquiry.findOne({ subject: e.subject, name: e.name })) continue;
  await Enquiry.create(e);
  enqCreated++;
}

/* ---------------- a limited sub-admin, to demo permissions ---------------- */
const subEmail = 'results.officer@bharatibhasha.org';
let subCreated = false;
if (!(await User.findOne({ email: subEmail }))) {
  await User.create({
    name: 'Results Officer',
    email: subEmail,
    passwordHash: await bcrypt.hash('officer@123', 10),
    role: 'admin',
    designation: 'Examination Cell',
    permissions: ['schools.view', 'students.view', 'results.view', 'results.manage', 'exams.view'],
    isActive: true,
  });
  subCreated = true;
}

console.log(`\n📦 Demo data seeded`);
console.log(`   schools: ${schoolsCreated}   (login: <school email> / school@123)`);
console.log(`   students: ${studentsCreated}`);
console.log(`   announcements: ${annCreated}`);
console.log(`   enquiries: ${enqCreated}`);
if (subCreated) console.log(`   sub-admin: ${subEmail} / officer@123  (results only, cannot publish)`);
console.log('');

await mongoose.disconnect();
process.exit(0);
