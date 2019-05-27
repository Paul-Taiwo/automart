import { createUser, findEmail, allUsers } from './users';
import { createCarAds, allCarsAds } from './cars';
import { createOrder, updatePrice, allOrder } from './order';

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
    updatePrice,
    allOrder,
  },
};

export default models;
