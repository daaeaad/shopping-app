// isLike
export const isLike = (arr = [], id = '') => {
  const arrFilter = arr.filter((item) => item.product_no === id);

  const result = !!arrFilter.length;

  return result;
};

export const toggleLike = () => {};
