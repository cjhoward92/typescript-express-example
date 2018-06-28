import * as express from 'express';

import { YouNeedToStop } from '../error/YouNeedToStop';
import { NotFound } from '../error/NoutFound';
import { Unauthorized,  } from '../error/Unauthorized';
import { Forbidden } from '../error/Forbidden';
import { InvalidArgument } from '../error/InvalidArgument';

const convertErrorToStatusCode = (error: Error): number => {
  if (error instanceof YouNeedToStop)
    return 429;
  else if (error instanceof NotFound)
    return 404;
  else if (error instanceof Unauthorized)
    return 401;
  else if (error instanceof Forbidden)
    return 403;
  else if (error instanceof InvalidArgument)
    return 422;
  else
    return 500;
};

export default (error: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const statusCode = convertErrorToStatusCode(error);

  res.status(statusCode).json({
    message: error.message
  });
};