import * as mongoose from 'mongoose';

import {
  IUser,
  UserStatus
} from './User';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  status: { type: String, required: true, default: UserStatus.ACTIVE  },
  // subscriptions: [{ type: mongoose.Types.ObjectId, ref: 'Subscription' }]
});

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model(
  'User',
  UserSchema
);

export const saveUser = async (user: IUser): Promise<void> => {
  const model = new UserModel(user);
  await model.save();
};
