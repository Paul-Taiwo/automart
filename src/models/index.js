import { createUser, findEmail, allUsers } from './users';
import {
  createCarAds, updateStatus, updateCarAdPrice, allCarsAds,
} from './cars';
import { createOrder, updatePrice, allOrder } from './order';
import { createFlag, allFlags } from './flags';

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
  Flags: {
    createFlag,
    allFlags,
  },
};

export default models;
