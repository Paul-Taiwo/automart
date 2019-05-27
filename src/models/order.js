const allOrder = [];

const createOrder = (data = null) => {
  if (!data) {
    throw new Error('Please provide an object');
  }

  const id = parseInt(allOrder.length + 123400, 10);
  const orderData = {
    id,
    ...data,
    created_on: new Date().toISOString(),
    status: 'pending',
  };

  allOrder.push(orderData);

  return orderData;
};

export {
  createOrder,
  allOrder,
};
