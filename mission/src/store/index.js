import { createStore } from 'vuex';
import cartModule from './modules/cartModule';
import orderModule from './modules/orderModule';
import userModule from './modules/userModule';

export default createStore({
  /* ******** state { ******** */
  state: {
    // 구매하는 상품
    orders: [],
  },
  /* ******** } state 끝 ******** */

  /* ******** mutations { ******** */
  mutations: {
    setOrderList: (state, { product }) => {
      state.orders = product;
    },
    deleteAllOrderList: (state) => {
      state.orders = [];
    },
  },
  /* ******** } mutations 끝 ******** */

  /* ******** actions { ******** */
  actions: {
    handleOrderList: ({ commit }, { product }) => {
      if (product === 'delete') {
        commit('deleteAllOrderList');
      } else {
        commit('setOrderList', { product });
      }
    },
  },
  /* ******** } actions 끝 ******** */

  /* ******** getters { ******** */
  getters: {
    /* 주문하는 상품 목록 { */
    getOrderItem: (state) => {
      const result = state.orders.map((order) => {
        const product = state.products.find((item) => item.product_no === order.product_no);
        return {
          product_no: product.product_no,
          name: product.name,
          image: product.image,
          price: product.price,
          original_price: product.original_price,
          description: product.description,
          quantity: order.quantity,
          total_price: order.quantity * product.price,
        };
      });

      return result;
    },
    /* } 주문하는 상품 목록 끝 */

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

    /* 사용자 정보 { */
    getUser: (state) => {
      const result = state.user;

      return result;
    },
    /* } 사용자 정보 끝 */
  },
  /* ******** } getters 끝 ******** */

  /* ******** modules { ******** */
  modules: {
    cartModule,
    orderModule,
    userModule,
  },
  /* ******** } modules 끝 ******** */
});
