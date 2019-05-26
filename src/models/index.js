import { createUser, findEmail, allUsers } from './users';
import { createCarAds, allCarsAds } from './cars';

const models = {
  User: {
    createUser,
    findEmail,
    allUsers,
  },
  Cars: {
    createCarAds,
    allCarsAds,
  },
};

export default models;
