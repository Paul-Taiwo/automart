import { createUser, findEmail, allUsers } from './users';
import {
  createCarAds, updateStatus, updateCarAdPrice, allCarsAds,
} from './cars';
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
    updateCarAdPrice,
    allCarsAds,
  },
  Orders: {
    createOrder,
    updatePrice,
    allOrder,
  },
};

export default models;
