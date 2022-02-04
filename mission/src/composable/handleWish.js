// isLike
export const isLike = (arr = [], id = '') => {
  const arrFilter = arr.filter((item) => item.product_no === id);

  const result = !!arrFilter.length;
  // console.log('result :: ', result);
  return result;
};

export const toggleLike = () => {};
