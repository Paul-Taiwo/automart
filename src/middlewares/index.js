import validateName from './validateName';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import validateCarId from './validateCarId';
import validateOrder from './validateOrder';
import validateFlag from './validateFlag';

export default {
  Name: validateName,
  Email: validateEmail,
  PassWord: validatePassword,
  CarId: validateCarId,
  Order: validateOrder,
  Flag: validateFlag,
};
