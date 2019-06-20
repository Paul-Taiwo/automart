import validateName from './validateName';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import validateCarId from './validateCarId';
import validateCar from './validateCar';
import validateStatus from './validateStatus';
import validateOrder from './validateOrder';
import validatePrice from './validatePrice';
import validateNewPrice from './validateNewPrice';
import validateFlag from './validateFlag';

export default {
  Name: validateName,
  Email: validateEmail,
  PassWord: validatePassword,
  CarId: validateCarId,
  Car: validateCar,
  Status: validateStatus,
  Order: validateOrder,
  Price: validatePrice,
  NewPrice: validateNewPrice,
  Flag: validateFlag,
};
