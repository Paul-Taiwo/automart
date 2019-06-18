import { config } from 'dotenv';

config();

const DBconfig = {};

switch (process.env.NODE_ENV) {
  case 'test':
    DBconfig.connectionString = process.env.PGTEST_URL;
    break;
  case 'development':
    DBconfig.connectionString = process.env.PGDEV_URL;
    break;
  case 'production':
    DBconfig.connectionString = process.env.PGPRODUCTION_URL;
    break;
  default:
    throw new Error('Please specify a development environment in .env file');
}

export default DBconfig;
