const createUsersTable = `
  CREATE TABLE IF NOT EXISTS
  users (
    id INTEGER NOT NULL,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    is_admin BOOLEAN DEFAULT false,
    CONSTRAINT user_pkey PRIMARY KEY("id", "email")
    );`;

const createCarAdsTable = `
  DROP TYPE IF EXISTS car_state;
  DROP TYPE IF EXISTS car_status;
  CREATE TYPE car_state AS ENUM ('new', 'used');
  CREATE TYPE car_status AS ENUM('sold', 'available');
  CREATE TABLE IF NOT EXISTS
  cars (
    id INTEGER NOT NULL,
    owner VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    "createdOn" TIMESTAMP,
    manufacturer VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    state car_state,
    status car_status DEFAULT 'available',
    CONSTRAINT cars_pkey PRIMARY KEY("id")
    );`;

const createOrderTable = `
  DROP TYPE IF EXISTS order_status;
  CREATE TYPE order_status AS ENUM ('pending', 'accepted', 'rejected');
  CREATE TABLE IF NOT EXISTS
  orders (
    id INTEGER NOT NULL,
    buyer INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    "createdOn" TIMESTAMP,
    amount FLOAT NOT NULL,
    status order_status DEFAULT 'pending',
    CONSTRAINT order_pkey PRIMARY KEY("id")
    );`;

const createFlagTable = `
  CREATE TABLE IF NOT EXISTS
  flags (
    id INTEGER NOT NULL,
    "createdOn" TIMESTAMP,
    car_id INTEGER NOT NULL,
    reason VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT flag_pkey PRIMARY KEY("id")
    );`;

const createTables = `${createUsersTable} ${createCarAdsTable} ${createOrderTable} ${createFlagTable}`;

export default createTables;
