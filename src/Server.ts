// We have to use '* as' with TypeScript unless there is a default export in the *.d.ts for the library
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

// These files have default exports and are typed in this project, so they don't need the *
import errorMiddleware from './middleware/ErrorMiddleware';
import buildUserRouter from './routes/UserRouteHandler';
import connectToMongo from './utilities/MongoConnect';

// A basic function that returns the express.Application interface. In this case, express is not only
// an import but also a namespace as defined in the express.d.ts found in @types/express
const buildApp = (): express.Application => {
  const app: express.Application = express();
  
  app.use(bodyParser.json());

  app.use('/user', buildUserRouter());
  
  app.use(errorMiddleware);

  return app;
};

// The return type Promise<void> can be used for async functions that do not return anything
const start = async (): Promise<void> => {
  await connectToMongo();

  const app = buildApp();  
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
};

// Let's call our function!
start();