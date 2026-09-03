import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

const ResultSchema = new Schema(
  {
    studentId: { type: Types.ObjectId, ref: 'Student', required: true, index: true },
    rollNo: { type: String, required: true, uppercase: true, trim: true, index: true },
    studentName: { type: String, trim: true },
    schoolId: { type: Types.ObjectId, ref: 'School', required: true, index: true },
    schoolName: { type: String, trim: true },
    examId: { type: Types.ObjectId, ref: 'Exam', default: null, index: true },
    examName: { type: String, trim: true },
    classLevel: { type: String, trim: true, index: true },
    subject: { type: String, enum: ['hindi', 'sanskrit', 'both'], default: 'hindi', index: true },
    marksObtained: { type: Number, required: true, min: 0 },
    totalMarks: { type: Number, required: true, min: 1, default: 100 },
    percentage: { type: Number, default: 0 },
    grade: { type: String, default: '' },
    rankSchool: { type: Number, default: 0 },
    rankState: { type: Number, default: 0 },
    rankNational: { type: Number, default: 0 },
    remark: { type: String, trim: true },
    isPublished: { type: Boolean, default: false, index: true },
    session: { type: String, default: '2026' },
  },
  { timestamps: true }
);

ResultSchema.index({ rollNo: 1, examId: 1 }, { unique: true });

export function gradeFor(pct: number) {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 35) return 'D';
  return 'E';
}

ResultSchema.pre('validate', function (next) {
  const doc = this as unknown as { marksObtained: number; totalMarks: number; percentage: number; grade: string };
  const total = doc.totalMarks || 100;
  doc.percentage = Math.round(((doc.marksObtained || 0) / total) * 10000) / 100;
  doc.grade = gradeFor(doc.percentage);
  next();
});

export type ResultDoc = InferSchemaType<typeof ResultSchema> & { _id: Types.ObjectId };
export const Result = models.Result || model('Result', ResultSchema);
