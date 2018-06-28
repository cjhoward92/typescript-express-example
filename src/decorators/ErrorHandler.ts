import * as express from 'express';

const asyncErrorHandlerWrapper = (originalFunction: Function) =>
  async function(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('In the async wrapper');
      await originalFunction(req, res, next);
    } catch (e) {
      next(e);
    }
  };

const errorHandlerWrapper = (originalFunction: Function) =>
  function(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('In the standard wrapper');
      originalFunction(req, res, next);
    } catch (e) {
      next(e);
    }
  };

const isAsync = (func: Function): boolean => func.constructor.name === 'AsyncFunction';

// This is our method decorator. It takes an object prototype and mutates it by wrapping the function
// in an error handler. This is so we can easily wrap express router functions in error handler logic
// without having to partially apply a function or simply wrap a function ourselves. It removes a ton
// of work.
export const handleRouteError = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalFunction = target[propertyKey];

  if (!originalFunction || typeof originalFunction !== 'function') {
    throw new Error('You can only use handleRouteError on a function');
  }

  target[propertyKey] = isAsync(originalFunction)
    ? asyncErrorHandlerWrapper(originalFunction)
    : errorHandlerWrapper(originalFunction);
};

// This is a class function that assumes all methods other than the constructor are to be wrapped
// in an error handler for the router. You can imagine how much work this can take from the user.
// Not a perfect pattern, but I think it may be the best we have in TypeScript or JavaScript.
export const handleAllRouteErrors = (constructor: Function) => {
  Object.getOwnPropertyNames(constructor.prototype).forEach((propertyKey: string) => {
    if (propertyKey === 'constructor')
      return;
    
    const originalFunction = constructor.prototype[propertyKey];

    if (!originalFunction || typeof originalFunction !== 'function') {
      throw new Error('You can only use handleRouteError on a function');
    }

    constructor.prototype[propertyKey] = isAsync(originalFunction)
      ? asyncErrorHandlerWrapper(originalFunction)
      : errorHandlerWrapper(originalFunction);
  });
};