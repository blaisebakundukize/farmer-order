import mongoose from 'mongoose';
import environment from '../config/environment';
import logger from './logger';

async function connect() {
  const dbUri = environment.dbUri;

  try {
    await mongoose.connect(`${dbUri}`);
    logger.info('Connected to DB');
  } catch (error) {
    logger.error(`Could not connect to DB: ${error}`);
    process.exit(1);
  }
}

export default connect;
