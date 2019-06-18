import { Pool } from 'pg';
import { config } from 'dotenv';
import DBconfig from './config';

config();

const pool = new Pool(DBconfig);

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
    });
  },
};
