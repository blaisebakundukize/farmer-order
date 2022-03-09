import mongoose from 'mongoose';
import connect from './utils/connect';

(async () => {
  await connect();
})();

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

global.beforeAll(async () => {
  await clearDatabase();
});

global.afterAll(async () => {
  await clearDatabase();
});
