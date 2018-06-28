import { expect } from 'chai';

import { createUser } from './../../../src/domain/user/CreateUser';
import { IUser, UserStatus } from '../../../src/domain/user/User';
import { InvalidArgument } from '../../../src/error/InvalidArgument';

const testCreateUserWithManyBadEmails = (emails: string[]) => {
  emails.forEach((email: string) => {
    it(`throws when email is ${email || 'empty'}`, function() {
      let err: Error | null = null;
      try {
        const u = createUser('agoodusername', email);
        console.log(u);
      } catch (e) {
        err = e;
      }

      if (!err) {
        expect.fail('The createUser function should throw an error');
        return;
      }

      expect(err).instanceof(InvalidArgument);
      expect(err.message.toLowerCase()).include('email');
    });
  });
}

const testCreateUserWithManyBadUsernames = (usernames: string[]) => {
  usernames.forEach((username: string) => {
    it(`throws when username is ${username || 'empty'}`, function() {
      let err: Error | null = null;
      try {
        const u = createUser(username, 'carsonh@axosoft.com');
        console.log(u);
      } catch (e) {
        err = e;
      }

      if (!err) {
        expect.fail('The createUser function should throw an error');
        return;
      }

      expect(err).instanceof(InvalidArgument);
      expect(err.message.toLowerCase()).include('username');
    });
  });
}

// Some tests written in TypeScript
describe('CreateUser', function() {
  describe('#createUser', function() {
    it('creates a user', function() {
      const email: string = 'carsonh@axosoft.com';
      const username: string = 'carsonh';

      const user: IUser = createUser(username, email);

      expect(user.username).to.eq(username);
      expect(user.email).to.eq(email);
      expect(user.status).to.eq(UserStatus.ACTIVE);
    });

    testCreateUserWithManyBadEmails([
      '',
      '4',
      '5d',
      '56c',
      'd@.c',
      'a@@@@',
      'a.com'
    ]);

    testCreateUserWithManyBadUsernames([
      '',
      'a',
      'aa'
    ]);
  });
});