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

export const handleRouteError = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalFunction = target[propertyKey];

  if (!originalFunction || typeof originalFunction !== 'function') {
    throw new Error('You can only use handleRouteError on a function');
  }

  target[propertyKey] = isAsync(originalFunction)
    ? asyncErrorHandlerWrapper(originalFunction)
    : errorHandlerWrapper(originalFunction);
};

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