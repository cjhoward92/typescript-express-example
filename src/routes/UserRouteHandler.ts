import * as express from 'express';

import { NotFound } from './../error/NoutFound';

import {
  handleRouteError,
  handleAllRouteErrors
} from '../decorators/ErrorHandler';

import {
  createAndSaveUser
} from '../domain/user/UserService';

// We define this as type here and not interface
// because I felt like it made more sense for an
// anonymous blob of data to assume a shape.
// Interfaces have other features (like merging)
// that we just don't need here. The type is also
// not exported, which I use a rule as well. If not
// exported it is a candidate for type.
type UserPostData = {
  email: string;
  username: string;
};

// This is a decorator that you can find in the 'decorators/ErrorHandler.ts' file.
// This decorator applies to the class as a whole, and is trigger when the file
// is loaded via some import.
@handleAllRouteErrors
class UserRouteHandler {

  // This is a method decorator. You can only use method
  // decorators on methods that belong to a class. It is
  // commented out because the class-level decorator does
  // the same thing. Comment out the class decorator and
  // uncomment this decorator to see how they differ.
  // @handleRouteError
  get(req: express.Request, res: express.Response) {
    // Take a peak at the /errors folder to see some of the errors and then
    // check out the ErrorMiddleware to see how they are used.
    throw new NotFound('This will explode, and the decorator will catch it!');
  }

  // If you comment out the class decorator and then
  // uncomment the above method decorator, you will see
  // that this no longer handles errors the same way.
  async post(req: express.Request, res: express.Response) {
    const {
      email,
      username
    } = req.body as UserPostData;

    await createAndSaveUser(username, email);
    res.status(200).json({ username, email });
  }
}

// We need to build our express Router with out handler.
// We are using a handler to take advantage of decorators.
export default (): express.Router => {
  const handler = new UserRouteHandler();
  const router = express.Router();

  router.get('/', handler.get);
  router.post('/', handler.post);

  return router;
};