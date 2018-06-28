import * as mongoose from 'mongoose';

import {
  IUser,
  UserStatus
} from './User';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  status: { type: String, required: true, default: UserStatus.ACTIVE  }
});

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model(
  'User',
  UserSchema
);

// This is the actual data call. Notice it retuns void as to allow
// us to adhere to Command Query Separation (CQS). For infor on
// CQS, see this blog post http://blog.ploeh.dk/2016/05/06/cqs-and-server-generated-entity-ids/
export const saveUser = async (user: IUser): Promise<void> => {
  const model = new UserModel(user);
  await model.save();
};
