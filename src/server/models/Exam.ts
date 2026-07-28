import { Schema, models, model } from "mongoose";

export interface ExamDoc {
  _id?: string;
  title: string;
  subject: "Hindi" | "Sanskrit" | "Both";
  date: string;
  time: string;
  mode: string;
  eligibleClasses: string;
  status: "आगामी" | "सक्रिय" | "समाप्त";
}

const ExamSchema = new Schema<ExamDoc>(
  {
    title: { type: String, required: true },
    subject: { type: String, enum: ["Hindi", "Sanskrit", "Both"], required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    eligibleClasses: { type: String, required: true },
    status: { type: String, enum: ["आगामी", "सक्रिय", "समाप्त"], default: "आगामी" },
  },
  { timestamps: true }
);

export const Exam = models.Exam || model<ExamDoc>("Exam", ExamSchema);
