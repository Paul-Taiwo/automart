import validateName from './validateName';
import validateEmail from './validateEmail';
import validateStatus from './validateStatus';
import validatePrice from './validatePrice';
import validateCar from './validateCar';
import validateCarId from './validateCarId';
import validateOrder from './validateOrder';
import validateNewPrice from './validateNewPrice';
import validatePassword from './validatePassword';

export default {
  Name: validateName,
  Email: validateEmail,
  PassWord: validatePassword,
  Status: validateStatus,
  Price: validatePrice,
  Car: validateCar,
  CarId: validateCarId,
  Order: validateOrder,
  NewPrice: validateNewPrice,
};
