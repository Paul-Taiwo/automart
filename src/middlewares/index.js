import validateName from './validateName';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import validateCarId from './validateCarId';
import validateCar from './validateCar';
import validateOrder from './validateOrder';
import validateNewPrice from './validateNewPrice';
import validateFlag from './validateFlag';

export default {
  Name: validateName,
  Email: validateEmail,
  PassWord: validatePassword,
  CarId: validateCarId,
  Car: validateCar,
  Order: validateOrder,
  NewPrice: validateNewPrice,
  Flag: validateFlag,
};
