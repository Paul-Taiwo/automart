import { createUser, findEmail, allUsers } from './users';
import { createCarAds, allCarsAds } from './cars';
import { createOrder, allOrder } from './order';

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
  Orders: {
    createOrder,
    allOrder,
  },
};

export default models;
