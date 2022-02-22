import { createStore } from 'vuex';
import Repository from '@/repositories/RepositoryFactory';

const CartRepository = Repository.get('cart');

export default createStore({
  /* ******** state { ******** */
  state: {
    // 장바구니
    carts: [
      {
        product_no: 'sample1111',
        quantity: 1,
        checked: true,
      },
      {
        product_no: 'asdf1234',
        quantity: 3,
        checked: true,
      },
    ],

    // 체크된 장바구니 상품
    checkedCarts: [],

    // 구매하는 상품
    orders: [],

    // 상품
    products: [
      {
        product_no: 'p1',
        name: 'SWEATSHIRT FLOWERMARDI_GREY',
        image:
          'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y',
        original_price: 80000,
        price: 80000,
        stock_count: 100,
        description: '한겨울까지 입을 수 있는 따듯한 스웨터',
        like: 128,
        options: { color: ['Black', 'White', 'Grey'], size: ['Small', 'Medium', 'Large'] },
        store: {
          companyName: '다애스토어',
        },
      },
      {
        product_no: 'p2',
        name: 'SWEATSHIRT UNIV_NAVY IVORY',
        image:
          'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',
        original_price: 75000,
        price: 71250,
        stock_count: 100,
        description: '교복처럼 입을 수 있는 데일리룩',
        like: 133,
        options: { color: [], size: ['Small', 'Medium', 'Large'] },
        store: {
          companyName: '다애마켓',
        },
      },
      {
        product_no: 'p3',
        name: 'ts0307 플리스 후드-베이지',
        image:
          'https://i.picsum.photos/id/535/2962/3949.jpg?hmac=Cs154XYJYEmSoM-YPHR1Kcp2LDRzxLfKxa67Av3ZIhY',
        original_price: 49700,
        price: 30000,
        stock_count: 100,
        description: '캐주얼하게 입을 수 있는 후드',
        like: 133,
        options: { color: [], size: [] },
        store: {
          companyName: 'DAAE Store',
        },
      },
      {
        product_no: 'p4',
        name: 'MILAGRO WASHED CREWNECK SWEATSHIRT BLACK',
        image:
          'https://i.picsum.photos/id/445/4256/2819.jpg?hmac=99qT1IPidZrzaXTgG1ixRRVwElWXUlNepU2k692G44c',
        original_price: 69000,
        price: 35000,
        stock_count: 100,
        description: '판매자도 따로 챙겨놓은 가성비 좋은 아이템',
        like: 4000,
        options: { color: [], size: [] },
        store: {
          companyName: 'DAAE Market',
        },
      },
    ],

    user: {
      name: '김다애',
      email: 'daae@naver.com',
      tel: '01012345678',
      delivery: {
        name: '김다애',
        address1: '123456',
        address2: '서울특별시 OO구 OO로 000-00',
        address3: 'OO오피스텔 000호',
        tel: '01012325678',
      },
    },
  },
  /* ******** } state 끝 ******** */

  /* ******** mutations { ******** */
  mutations: {
    setCart: (state, items) => {
      const result = items.map((item) => ({ ...item, checked: true }));
      state.carts = result;
    },
    setNewItem: (state, { id, num }) => {
      const newItem = { product_no: id, quantity: num };
      state.carts.push(newItem);
    },
    deleteItem: (state, { id }) => {
      const newCarts = state.carts.filter((cart) => cart.product_no !== id);
      state.carts = newCarts;
    },
    deleteAllItem: (state) => {
      state.carts = [];
    },
    setQuantity: (state, { id, num }) => {
      const item = state.carts.find((cart) => cart.product_no === id);

      item.quantity = num;
    },
    setChecked: (state, { id }) => {
      const item = state.carts.find((cart) => cart.product_no === id);

      item.checked = !item.checked;
    },
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
    setCart: async ({ commit }) => {
      const cartData = await CartRepository.getList();
      console.log('cartData :: ', cartData);
      commit('setCart', cartData);
    },

    addCart: ({ state, commit }, { id, num }) => {
      const item = state.carts.find((cart) => cart.product_no === id);

      console.log('item :: ', item);

      if (!item) {
        commit('setNewItem', { id, num });
      } else {
        commit('setQuantity', { id, num });
      }
    },

    deleteCart: ({ state, commit }, { id }) => {
      if (id === 'all') {
        commit('deleteAllItem');
      } else {
        const item = state.carts.find((cart) => cart.product_no === id);
        if (item) {
          commit('deleteItem', { id });
        }
      }
    },

    toggleChecked: ({ commit }, { id }) => {
      commit('setChecked', { id });
    },

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
    /* 장바구니 상품 목록 { */
    getCartItem: (state) => {
      const result = state.carts.map((cart) => {
        const product = state.products.find((item) => item.product_no === cart.product_no);

        return {
          product_no: product.product_no,
          name: product.name,
          image: product.image,
          price: product.price,
          original_price: product.original_price,
          description: product.description,
          quantity: cart.quantity,
          total_price: cart.quantity * product.price,
        };
      });

      return result;
    },
    /* } 장바구니 상품 목록 끝 */

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

    /* 체크된 장바구니 상품 id, quantity { */
    getCheckedIdAndQuantity: (state) => {
      const result = state.carts.filter((cart) => cart.checked);

      return result;
    },
    /* } 체크된 장바구니 상품 id, quantity 끝 */

    /* 체크된 장바구니 상품 id { */
    getCheckedId: (state) => {
      const checkedCarts = state.carts.filter((cart) => cart.checked);

      const result = checkedCarts.map((cart) => cart.product_no);

      return result;
    },
    /* } 체크된 장바구니 상품 id 끝 */

    /* 체크된 장바구니 상품 목록 { */
    getCheckedCartItem: (state, getters) => {
      const result = getters.getCheckedId.map((checkedCart) => {
        const carts = getters.getCartItem.find((cart) => cart.product_no === checkedCart);

        return carts;
      });

      return result;
    },
    /* } 체크된 장바구니 상품 목록 끝 */

    /* 장바구니 총 수량 { */
    getTotalCount: (state, getters) => {
      // 체크된 장바구니 상품들
      const checkedCartItems = getters.getCheckedCartItem;

      let result;

      if (!checkedCartItems.length) {
        result = 0;
      } else {
        // 장바구니 각 상품의 수량
        const quantityArr = checkedCartItems.map((item) => item.quantity);

        // 각 상품 수량 더하기
        result = quantityArr.reduce((acc, cur) => acc + cur);
      }

      // 총 수량 반환
      return result;
    },
    /* } 장바구니 총 수량 끝 */

    /* 장바구니 총 금액 { */
    getTotalPrice: (state, getters) => {
      // 체크된 장바구니 상품들
      const checkedCartItems = getters.getCheckedCartItem;

      let result;

      if (!checkedCartItems.length) {
        result = 0;
      } else {
        // 장바구니 각 상품의 총 금액
        const totalPriceArr = checkedCartItems.map((item) => item.total_price);

        // 각 상품 총 금액 더하기
        result = totalPriceArr.reduce((acc, cur) => acc + cur);
      }

      // 총 금액 반환
      return result;
    },
    /* } 장바구니 총 금액 끝 */

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
  modules: {},
  /* ******** } modules 끝 ******** */
});
