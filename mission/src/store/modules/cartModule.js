import Repository from '@/repositories/RepositoryFactory';

const CartRepository = Repository.get('cart');
const ItemRepository = Repository.get('item');

const cartModule = {
  namespaced: true,

  /* ******** state { ******** */
  state: () => ({
    carts: [],
  }),
  /* ******** } state 끝 ******** */

  /* ******** mutations { ******** */
  mutations: {
    /* 장바구니 데이터 불러오기 { */
    setCart: (state, items) => {
      state.carts = items;
    },
    /* } 장바구니 데이터 불러오기 끝 */

    /* 새 상품 추가 { */
    setNewItem: (state, { newItem }) => {
      state.carts.push(newItem);
    },
    /* } 새 상품 추가 끝 */

    /* 수량 증가/감소 { */
    setQuantity: (state, { id, num }) => {
      const item = state.carts.find((cart) => cart.product_no === id);

      item.quantity = num;
    },
    /* } 수량 증가/감소 끝 */

    /* 목록 가격 증가/감소 { */
    setTotalPrice: (state, { id, num }) => {
      const item = state.carts.find((cart) => cart.product_no === id);

      item.total_price = item.price * num;
    },
    /* } 목록 가격 증가/감소 끝 */

    /* 선택 삭제 { */
    deleteItem: (state, { id }) => {
      const newCarts = state.carts.filter((cart) => cart.product_no !== id);
      state.carts = newCarts;
    },
    /* } 선택 삭제 끝 */

    /* 전체 삭제 { */
    deleteAllItem: (state) => {
      state.carts = [];
    },
    /* } 전체 삭제 끝 */

    /* 체크박스 { */
    setChecked: (state, { id }) => {
      const item = state.carts.find((cart) => cart.product_no === id);

      item.checked = !item.checked;
    },
    /* } 체크박스 끝 */
  },
  /* ******** } mutations 끝 ******** */

  /* ******** actions { ******** */
  actions: {
    /* 장바구니 데이터 불러오기 { */
    setCart: async ({ commit }) => {
      const cartDatas = await CartRepository.getList();

      const result = cartDatas.map((cartData) => ({
        ...cartData,
        checked: true,
        total_price: cartData.price * cartData.quantity,
      }));

      commit('setCart', result);
    },
    /* } 장바구니 데이터 불러오기 끝 */

    /* 장바구니 추가 { */
    addCart: async ({ state, commit }, { id, num }) => {
      const item = state.carts.find((cart) => cart.product_no === id);

      if (!item) {
        // 장바구니 목록에 없으면 새로 추가
        const itemData = await ItemRepository.getList();

        if (!itemData) {
          alert('일시적인 오류가 발생했습니다. 다시 시도해주세요.'); //eslint-disable-line
        }
        const findItem = itemData.find((el) => el.product_no === id);

        if (!findItem || !findItem.length) {
          alert('삭제된 상품 입니다. 장바구니에 추가할 수 없습니다.'); // eslint-disable-line
          return false;
        }

        // 장바구니에 새로 추가될 상품 객체
        const newItem = {
          product_no: id,
          quantity: num,
          name: findItem.name,
          image: findItem.image,
          original_price: findItem.original_price,
          price: findItem.price,
          stock_count: findItem.stock_count,
          description: findItem.description,
          options: findItem.options,
          store: findItem.store,
        };

        commit('setNewItem', { newItem });
      } else {
        // 장바구니에 이미 있으면
        // 수량 증가/감소
        commit('setQuantity', { id, num });
        // 해당 상품 목록 총 가격 증가/감소
        commit('setTotalPrice', { id, num });
      }
      return true;
    },
    /* } 장바구니 추가 끝 */

    /* 삭제하기 { */
    deleteCart: ({ state, commit }, { id }) => {
      if (id === 'all') {
        // 전체 삭제
        commit('deleteAllItem');
      } else {
        // 선택 삭제
        const item = state.carts.find((cart) => cart.product_no === id);
        if (item) {
          commit('deleteItem', { id });
        }
      }
    },
    /* } 삭제하기 끝 */

    /* 체크박스 { */
    toggleChecked: ({ commit }, { id }) => {
      commit('setChecked', { id });
    },
    /* } 체크박스 끝 */
  },
  /* ******** } actions 끝 ******** */

  /* ******** getters { ******** */
  getters: {
    /* 장바구니 상품 목록 { */
    getCartItem: (state) => {
      const result = !state.carts.length ? 0 : state.carts;

      return result;
    },
    /* } 장바구니 상품 목록 끝 */

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
  },
  /* ******** } getters 끝 ******** */
};

export default cartModule;
