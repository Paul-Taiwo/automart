import validateInput from './validateInput';
import validateName from './validateName';
import validateEmail from './validateEmail';
import validateStatus from './validateStatus';
import validatePrice from './validatePrice';

export default {
  Name: validateName,
  Email: validateEmail,
  Input: validateInput,
  Status: validateStatus,
  Price: validatePrice,
};
