import { createUser, findEmail, allUsers } from './users';

const models = {
  User: {
    createUser,
    findEmail,
    allUsers,
  },
};

export default models;
