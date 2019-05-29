const allFlags = [];

const createFlag = (data) => {
  const id = parseInt(allFlags.length + 12657890, 10);

  const flagData = {
    id,
    ...data,
  };

  allFlags.push(flagData);

  return flagData;
};

export {
  createFlag,
  allFlags,
};
