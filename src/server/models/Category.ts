import mongoose, { Schema, models, model } from "mongoose";

export interface CategoryDoc {
  _id?: string;
  name: string;
  slug: string;
  count: number;
}

const CategorySchema = new Schema<CategoryDoc>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = models.Category || model<CategoryDoc>("Category", CategorySchema);
