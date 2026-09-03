import { Schema, models, model, InferSchemaType } from 'mongoose';

/** single document, key = "global" */
const SettingSchema = new Schema(
  {
    key: { type: String, unique: true, default: 'global' },
    siteName: { type: String, default: 'Bharati Bhasha Olympiad' },
    siteNameHi: { type: String, default: 'भारती भाषा ओलंपियाड' },
    tagline: { type: String, default: 'National Hindi & Sanskrit Olympiad' },
    taglineHi: { type: String, default: 'राष्ट्रीय हिन्दी एवं संस्कृत ओलंपियाड' },
    contactEmail: { type: String, default: 'info@bharatibhasha.org' },
    contactPhone: { type: String, default: '+91 00000 00000' },
    currentSession: { type: String, default: '2026' },
    feePerStudent: { type: Number, default: 150 },
    registrationOpen: { type: Boolean, default: true },
    resultsPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type SettingDoc = InferSchemaType<typeof SettingSchema>;
export const Setting = models.Setting || model('Setting', SettingSchema);

export async function getSettings() {
  const existing = await Setting.findOne({ key: 'global' });
  if (existing) return existing;
  return Setting.create({ key: 'global' });
}
