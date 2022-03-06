import dotenv from 'dotenv';

dotenv.config();

const environment = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5050,
  dbUri: process.env.DB_URI,
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  saltWorkFactor: 10,
  secretKey: process.env.SECRET_KEY || '',
  accessTokenTimeToLive: '7d',
};

export default environment;
