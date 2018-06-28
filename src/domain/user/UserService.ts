import {
  createUser
} from './CreateUser';

import {
  IUser,
  UserStatus
} from './User';

import {
  saveUser
} from './UserDB';

export const createAndSaveUser = async (username: string, email: string): Promise<void> => {
  const user = createUser(username, email);
  await saveUser(user);
};