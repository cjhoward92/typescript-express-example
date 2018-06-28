import { InvalidArgument } from './../../error/InvalidArgument';

import { IUser, UserStatus } from './User';

// This is a very simple function that encapsulated the domain logic of the user system.
// There is no need for external dependencies, so the important stuff can be tested
// thoroughly. This adheres to functional 'dependency rejection' as they say...
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