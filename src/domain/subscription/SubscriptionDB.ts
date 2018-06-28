import * as mongoose from 'mongoose';

enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  INACTIVE = 'inactive'
}

const SubscriptionSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createdTime: { type: Number, required: true },
  purchasedLicenses: { type: Number, required: true, default: 0 },
  usedLicenses: { type: Number, required: true, default: 0 },
  status: { type: String, required: true, default: SubscriptionStatus.ACTIVE  },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

SubscriptionSchema.index({ createdBy: 1 }, { unique: true });

const SubscriptionModel = mongoose.model(
  'Subscription',
  SubscriptionSchema
);
