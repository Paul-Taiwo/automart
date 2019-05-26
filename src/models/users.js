const allUsers = [];

const createUser = (data = null) => {
  if (!data) {
    throw new Error('Please provide an object');
  }

  const id = parseInt(allUsers.length + 1000, 10);

  const userData = {
    id,
    ...data,
    isAdmin: false,
  };

  allUsers.push(userData);

  return userData;
};

const findEmail = email => allUsers.find(user => user.email === email);

export {
  createUser,
  findEmail,
  allUsers,
};
