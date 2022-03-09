export const addItem = (item) => {
  return {
    type: "ADD",
    payload: item,
  };
};

export const delItem = (item) => {
  return {
    type: "DELETE",
    payload: item,
  };
};
