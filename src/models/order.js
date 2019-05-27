const allOrder = [];

const createOrder = (data = null) => {
  if (!data) {
    throw new Error('Please provide an object');
  }

  const id = parseInt(allOrder.length + 123400, 10);
  const orderData = {
    id,
    ...data,
    createdOn: new Date().toISOString(),
    status: 'available',
  };

  allOrder.push(orderData);

  return orderData;
};

export {
  createOrder,
  allOrder,
};
