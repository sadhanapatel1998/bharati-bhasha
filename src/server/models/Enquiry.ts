import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    role: { type: String, trim: true },
    schoolOrCity: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, trim: true },
    reply: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending', index: true },
  },
  { timestamps: true }
);

export type EnquiryDoc = InferSchemaType<typeof EnquirySchema> & { _id: Types.ObjectId };
export const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);
