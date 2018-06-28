import { InvalidArgument } from './../../error/InvalidArgument';

import { IUser, UserStatus } from './User';

export const createUser = (username: string, email: string): IUser => {
  if (!username || username.length < 3)
    throw new InvalidArgument('Username must be at least 3 characters long');

  if (!email || email.length < 6)
    throw new InvalidArgument('Email must be at least 6 characters long');

  return {
    username,
    email,
    status: UserStatus.ACTIVE
  };
};