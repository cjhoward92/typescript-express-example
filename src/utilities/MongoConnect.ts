import * as mongoose from 'mongoose';

const connect = (): Promise<void> => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/tsexpress', (err) => {
    if (err) {
      reject(err);
      return;
    }

    console.log('Connected to DB');
    resolve();
  });
});

export default connect;