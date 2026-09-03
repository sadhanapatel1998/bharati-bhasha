import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

const SchoolSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    nameHi: { type: String, trim: true },
    principal: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    board: { type: String, default: 'CBSE', trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true, index: true },
    state: { type: String, trim: true, index: true },
    pincode: { type: String, trim: true },
    website: { type: String, trim: true },
    logo: { type: String, trim: true },
    /** lifecycle controlled by the super admin */
    status: {
      type: String,
      enum: ['pending', 'active', 'rejected', 'suspended'],
      default: 'pending',
      index: true,
    },
    statusNote: { type: String, trim: true },
    studentCount: { type: Number, default: 0 },
    subjects: { type: [String], default: [] },
    session: { type: String, default: '2026' },
    approvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

SchoolSchema.index({ name: 'text', city: 'text', code: 'text' });

export type SchoolDoc = InferSchemaType<typeof SchoolSchema> & { _id: Types.ObjectId };
export const School = models.School || model('School', SchoolSchema);

/** BBO-DL-0007 style code */
export function buildSchoolCode(state: string, seq: number) {
  const st = (state || 'IN').replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'IN';
  return `BBO-${st}-${String(seq).padStart(4, '0')}`;
}

/** Same reasoning as nextRollNo — never reuse a code that already exists. */
export async function nextSchoolCode(state: string) {
  let seq = (await School.countDocuments({})) + 1;
  for (let i = 0; i < 10000; i++) {
    const candidate = buildSchoolCode(state, seq);
    if (!(await School.exists({ code: candidate }))) return candidate;
    seq += 1;
  }
  return `BBO-XX-${Date.now().toString().slice(-4)}`;
}
