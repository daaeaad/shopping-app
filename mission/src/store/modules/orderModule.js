import Repository from '@/repositories/RepositoryFactory';

const itemRepository = Repository.get('item');

const orderModule = {
  namespaced: true,

  /* ******** state { ******** */
  state: () => ({
    orders: [],
  }),
  /* ******** } state 끝 ******** */

  /* ******** mutations { ******** */
  mutations: {
    /* 주문할 상품 데이터 불러오기 { */
    setOrder: (state, items) => {
      state.orders = items;

      // console.log('state.orders :: ', state.orders);
    },
    /* } 주문할 상품 데이터 불러오기 끝 */

    /* 주문할 상품 데이터 삭제 { */
    deleteAllOrderList: (state) => {
      state.orders = [];
    },
    /* } 주문할 상품 데이터 삭제 끝 */
  },
  /* ******** } mutations 끝 ******** */

  /* ******** actions { ******** */
  actions: {
    /* 주문할 상품 데이터 처리 { */
    handleOrderList: async ({ commit }, { product }) => {
      if (!product && !product.length) {
        alert('오류가 발생하여 구매를 진행할 수 없습니다.'); // eslint-disable-line
        return;
      }

      if (product === 'delete') {
        commit('deleteAllOrderList');
      }

      const params = await product.map((el) => el.product_no);
      const itemDatas = await itemRepository.getOrderList(params);

      const result = itemDatas.data.map((itemData) => {
        const findProduct = product.find((item) => item.product_no === itemData.id);

        return {
          product_no: findProduct.product_no,
          name: itemData.name,
          image: itemData.image,
          price: itemData.price,
          original_price: itemData.original_price,
          description: itemData.description,
          quantity: findProduct.quantity,
          total_price: itemData.price * findProduct.quantity,
        };
      });

      commit('setOrder', result);
    },
    /* } 주문할 상품 데이터 처리 끝 */
  },
  /* ******** } actions 끝 ******** */

  /* ******** getters { ******** */
  getters: {
    /* 주문할 상품 목록 { */
    getOrderItem: (state) => {
      const result = state.orders;

      return result;
    },
    /* } 주문할 상품 목록 끝 */

    /* 주문상품 총 수량 { */
    getOrderTotalCount: (state, getters) => {
      // 주문상품 상품들
      const orderItems = getters.getOrderItem;

      let result;

      if (!orderItems.length) {
        result = 0;
      } else {
        // 주문상품 각 상품의 수량
        const quantityArr = orderItems.map((item) => item.quantity);

        // 각 상품 수량 더하기
        result = quantityArr.reduce((acc, cur) => acc + cur);
      }

      // 총 수량 반환
      return result;
    },
    /* } 주문상품 총 수량 끝 */

    /* 주문상품 총 금액 { */
    getOrderTotalPrice: (state, getters) => {
      // 주문상품 상품들
      const orderItems = getters.getOrderItem;

      let result;

      if (!orderItems.length) {
        result = 0;
      } else {
        // 주문상품 각 상품의 총 금액
        const totalPriceArr = orderItems.map((item) => item.total_price);

        // 각 상품 총 금액 더하기
        result = totalPriceArr.reduce((acc, cur) => acc + cur);
      }

      // 총 금액 반환
      return result;
    },
    /* } 주문상품 총 금액 끝 */
  },
  /* ******** } getters 끝 ******** */
};

export default orderModule;
