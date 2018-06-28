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

// This function is simple. It just composes the pure domain logic functions (createUser)
// and the effectful functions (saveUser) so we can totally isolate domain logic.
// See this blog series http://blog.ploeh.dk/2017/01/27/from-dependency-injection-to-dependency-rejection/
export const createAndSaveUser = async (username: string, email: string): Promise<void> => {
  const user = createUser(username, email);
  await saveUser(user);
};