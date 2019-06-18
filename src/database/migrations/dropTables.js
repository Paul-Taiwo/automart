const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
const dropCarAdsTable = 'DROP TABLE IF EXISTS cars CASCADE;';
const dropOrderTable = 'DROP TABLE IF EXISTS orders CASCADE;';
const dropFlagTable = 'DROP TABLE IF EXISTS flags CASCADE;';

const dropTables = `${dropUsersTable} ${dropCarAdsTable} ${dropOrderTable} ${dropFlagTable}`;

export default dropTables;
