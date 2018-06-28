import * as express from 'express';

import { NotFound } from './../error/NoutFound';

import {
  handleRouteError,
  handleAllRouteErrors
} from '../decorators/ErrorHandler';

import {
  createAndSaveUser
} from '../domain/user/UserService';

export type UserPostData = {
  email: string;
  username: string;
};

@handleAllRouteErrors
export class UserRouteHandler {

  // @handleRouteError
  get(req: express.Request, res: express.Response) {
    throw new Error('This will explode, and the decorator will catch it!');
  }

  async post(req: express.Request, res: express.Response) {
    const {
      email,
      username
    } = req.body as UserPostData;

    await createAndSaveUser(username, email);
    res.status(200).json({ username, email });
  }
}

export default (): express.Router => {
  const handler = new UserRouteHandler();
  const router = express.Router();

  router.get('/', handler.get);
  router.post('/', handler.post);

  return router;
};