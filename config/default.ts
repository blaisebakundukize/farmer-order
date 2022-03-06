import dotenv from 'dotenv';

dotenv.config();

const environment = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5050,
};

export default environment;
