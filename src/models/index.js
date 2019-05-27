import { createUser, findEmail, allUsers } from './users';
import { createCarAds, updateStatus, allCarsAds } from './cars';
import { createOrder, updatePrice, allOrder } from './order';

const models = {
  User: {
    createUser,
    findEmail,
    allUsers,
  },
  Cars: {
    createCarAds,
    updateStatus,
    allCarsAds,
  },
  Orders: {
    createOrder,
    updatePrice,
    allOrder,
  },
};

export default models;
