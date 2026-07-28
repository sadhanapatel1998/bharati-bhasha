import { Schema, models, model } from "mongoose";

export interface AdminDoc {
  _id?: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  designation?: string;
  avatar?: string;
  lastLogin?: string;
}

const AdminSchema = new Schema<AdminDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "प्रशासक" },
    designation: { type: String },
    avatar: { type: String },
    lastLogin: { type: String },
  },
  { timestamps: true }
);

export const Admin = models.Admin || model<AdminDoc>("Admin", AdminSchema);
