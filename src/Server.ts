import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import errorMiddleware from './middleware/ErrorMiddleware';
import buildUserRouter from './routes/UserRouteHandler';
import connectToMongo from './utilities/MongoConnect';

const buildApp = (): express.Application => {
  const app: express.Application = express();
  
  app.use(bodyParser.json());

  app.use('/user', buildUserRouter());
  
  app.use(errorMiddleware);

  return app;
};

const start = async () => {
  await connectToMongo();

  const app = buildApp();  
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
};

start();