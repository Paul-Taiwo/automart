const allUsers = [];

const createUser = (data = null) => {
  if (!data) {
    throw new Error('Please provide an object');
  }

  const userData = {
    id: allUsers.length + 1000,
    ...data,
    isAdmin: false,
  };

  allUsers.push(userData);

  return userData;
};

export {
  createUser,
  allUsers,
};
