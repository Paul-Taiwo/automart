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

// Find one order
const findOneOrder = id => allOrder.find(order => order.id === id);

const updatePrice = (id, data) => {
  // Find the order
  const order = findOneOrder(id);

  if (order.status === 'pending') {
    order.newPriceOffered = parseFloat(data);
  }

  return order;
};

export {
  createOrder,
  updatePrice,
  allOrder,
};
