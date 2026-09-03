import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

/**
 * One document per editable website block (see src/data/contentRegistry.ts).
 * `data` holds the exact same JSON shape the site already renders, so editing
 * it in the console changes the live page without any code change.
 */
const SiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    labelHi: { type: String },
    group: { type: String, default: 'pages', index: true },
    shape: { type: String, enum: ['list', 'object', 'raw'], default: 'raw' },
    titleField: { type: String, default: null },
    data: { type: Schema.Types.Mixed },
    isPublished: { type: Boolean, default: true },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

export type SiteContentDoc = InferSchemaType<typeof SiteContentSchema> & { _id: Types.ObjectId };
export const SiteContent = models.SiteContent || model('SiteContent', SiteContentSchema);
