import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

/**
 * Single identity table for everyone who can log in:
 * superadmin / admin  -> national office
 * school              -> one row per school, linked to a School doc
 */
const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin', 'school'], default: 'school', index: true },
    designation: { type: String, trim: true },
    /** fine-grained console permissions — ignored for superadmin (has all) and school */
    permissions: { type: [String], default: [] },
    avatar: { type: String, trim: true },
    schoolId: { type: Types.ObjectId, ref: 'School', default: null, index: true },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: Types.ObjectId };
export const User = models.User || model('User', UserSchema);
