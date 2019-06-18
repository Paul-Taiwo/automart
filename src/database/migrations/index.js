import { config } from 'dotenv';
import { info, error } from 'fancy-log';
import DB from '../dbconnection';
import createTables from './createTables';
import dropTables from './dropTables';
import 'regenerator-runtime';

config();

const create = async () => {
  try {
    const result = await DB.query(`${dropTables} ${createTables}`);
    info(result);
  } catch (err) {
    error(err.stack);
  }
};

create();
