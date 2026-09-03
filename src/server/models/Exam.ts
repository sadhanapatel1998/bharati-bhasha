import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

const ExamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    nameHi: { type: String, trim: true },
    session: { type: String, default: '2026', index: true },
    level: { type: String, enum: ['school', 'state', 'national'], default: 'school', index: true },
    subject: { type: String, enum: ['hindi', 'sanskrit', 'both'], default: 'both' },
    classLevels: { type: [String], default: [] },
    examDate: { type: String, trim: true },
    durationMinutes: { type: Number, default: 60 },
    totalMarks: { type: Number, default: 100 },
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming', index: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export type ExamDoc = InferSchemaType<typeof ExamSchema> & { _id: Types.ObjectId };
export const Exam = models.Exam || model('Exam', ExamSchema);
