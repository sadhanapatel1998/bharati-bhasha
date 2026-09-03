import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

const AnnouncementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    titleHi: { type: String, trim: true },
    body: { type: String, trim: true },
    bodyHi: { type: String, trim: true },
    category: { type: String, default: 'general', trim: true },
    audience: { type: String, default: 'all', trim: true },
    isPublished: { type: Boolean, default: true, index: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type AnnouncementDoc = InferSchemaType<typeof AnnouncementSchema> & { _id: Types.ObjectId };
export const Announcement = models.Announcement || model('Announcement', AnnouncementSchema);
