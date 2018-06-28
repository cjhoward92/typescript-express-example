import { InvalidArgument } from './../../error/InvalidArgument';

import { IUser, UserStatus } from './User';

const BASIC_EMAIL_REGEX: RegExp = /[@\.]/g;
export const createUser = (username: string, email: string): IUser => {
  if (!username || username.length < 3)
    throw new InvalidArgument('Username must be at least 3 characters long');

  if (!email || email.length < 5 || !email.match(BASIC_EMAIL_REGEX))
    throw new InvalidArgument('Email must be at least 5 characters long, contain an "@" symbol and a "."');

  return {
    username,
    email,
    status: UserStatus.ACTIVE
  };
};