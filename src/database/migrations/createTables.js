const createUsersTable = `
  DROP SEQUENCE IF EXISTS user_seq CASCADE;
  CREATE SEQUENCE "user_seq"
    start 1132675460
    increment 2;

  CREATE TABLE IF NOT EXISTS
  users (
    id INTEGER DEFAULT nextval('user_seq') NOT NULL,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    is_admin BOOLEAN DEFAULT false,
    CONSTRAINT user_pkey PRIMARY KEY("id", "email")
    );`;

const createCarAdsTable = `
  DROP SEQUENCE IF EXISTS car_seq CASCADE;
  DROP TYPE IF EXISTS car_state;
  DROP TYPE IF EXISTS car_status;

  CREATE SEQUENCE "car_seq"
    start 1225423140
    increment 1;

  CREATE TYPE car_status AS ENUM ('sold', 'available');
  CREATE TYPE car_state AS ENUM ('new', 'used');
  CREATE TABLE IF NOT EXISTS
  cars (
    id INTEGER DEFAULT nextval('car_seq') NOT NULL,
    owner VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    "createdOn" TIMESTAMP,
    manufacturer VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    body_type VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    price FLOAT NOT NULL,
    state car_state,
    status car_status DEFAULT 'available',
    images TEXT [] NOT NULL,
    CONSTRAINT cars_pkey PRIMARY KEY("id")
    );`;

const createOrderTable = `
  DROP SEQUENCE IF EXISTS order_seq CASCADE;
  DROP TYPE IF EXISTS order_status;

  CREATE SEQUENCE "order_seq"
    start 1156256210
    increment 1;
  CREATE TYPE order_status AS ENUM ('pending', 'accepted', 'rejected');
  CREATE TABLE IF NOT EXISTS
  orders (
    id INTEGER DEFAULT nextval('order_seq') NOT NULL,
    buyer INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    car_id INTEGER NOT NULL,
    "createdOn" TIMESTAMP,
    amount FLOAT NOT NULL,
    status order_status DEFAULT 'pending',
    CONSTRAINT order_pkey PRIMARY KEY("id")
    );`;

const createFlagTable = `
  DROP SEQUENCE IF EXISTS flag_seq CASCADE;
  CREATE SEQUENCE "flag_seq"
    start 1134524520
    increment 1;

  CREATE TABLE IF NOT EXISTS
  flags (
    id INTEGER DEFAULT nextval('flag_seq') NOT NULL,
    "createdOn" TIMESTAMP,
    car_id INTEGER NOT NULL,
    reason VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT flag_pkey PRIMARY KEY("id")
    );`;

const createTables = `${createUsersTable} ${createCarAdsTable} ${createOrderTable} ${createFlagTable}`;

export default createTables;
