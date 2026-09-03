import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

const StudentSchema = new Schema(
  {
    rollNo: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    dob: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
    classLevel: { type: String, required: true, trim: true, index: true },
    section: { type: String, trim: true },
    subject: { type: String, enum: ['hindi', 'sanskrit', 'both'], default: 'hindi', index: true },
    schoolId: { type: Types.ObjectId, ref: 'School', required: true, index: true },
    schoolName: { type: String, trim: true },
    examCenter: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ['registered', 'rollAllotted', 'hallTicket', 'appeared'],
      default: 'registered',
      index: true,
    },
    session: { type: String, default: '2026' },
  },
  { timestamps: true }
);

StudentSchema.index({ name: 'text', rollNo: 'text', fatherName: 'text' });

export type StudentDoc = InferSchemaType<typeof StudentSchema> & { _id: Types.ObjectId };
export const Student = models.Student || model('Student', StudentSchema);

/** BBO26-000123 */
export function buildRollNo(session: string, seq: number) {
  const yy = (session || '2026').slice(-2);
  return `BBO${yy}-${String(seq).padStart(6, '0')}`;
}

/**
 * Counting documents is not enough — deleting a student would make the next
 * sequence collide with an existing roll number. Walk forward until the number
 * is actually free.
 */
export async function nextRollNo(session: string) {
  let seq = (await Student.countDocuments({})) + 1;
  // guard against a pathological loop
  for (let i = 0; i < 10000; i++) {
    const candidate = buildRollNo(session, seq);
    if (!(await Student.exists({ rollNo: candidate }))) return candidate;
    seq += 1;
  }
  return `BBO${(session || '2026').slice(-2)}-${Date.now().toString().slice(-6)}`;
}
