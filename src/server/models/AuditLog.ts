import { Schema, models, model, Types, InferSchemaType } from 'mongoose';

const AuditLogSchema = new Schema(
  {
    actorId: { type: String, index: true },
    actorName: { type: String },
    actorRole: { type: String },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityLabel: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type AuditLogDoc = InferSchemaType<typeof AuditLogSchema> & { _id: Types.ObjectId };
export const AuditLog = models.AuditLog || model('AuditLog', AuditLogSchema);
