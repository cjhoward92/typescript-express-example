import * as mongoose from 'mongoose';

// We need to promisify the mongoose.connect function. Notice the return type
// is Promise<void> because our 'resolve' function does not have any input parameters.
// The generic type of the Promise<T> will match that of the type of input
// passed to resolve.
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