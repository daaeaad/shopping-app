import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import CartList from '@/views/CartList.vue';

/* store setting { */
const createVuexStore = (fakeState, fakeGetters) => createStore({
  state() {
    return fakeState;
  },
  getters: fakeGetters,
});

const makeWrapper = (store) => shallowMount(CartList, {
  global: {
    plugins: [store],
  },
});

const products = [
  {
    product_no: '1111',
    name: '잠옷',
    image: 'img url',
    price: 10000,
    description: '잠이 잘 오는 잠옷',
  },
  {
    product_no: '2222',
    name: '니트',
    image: 'img url2',
    price: 20000,
    description: '따뜻',
  },
  {
    product_no: '3333',
    name: '슬랙스',
    image: 'img url3',
    price: 50000,
    description: '검정색',
  },
  {
    product_no: '4444',
    name: '롱패딩',
    image: 'img url4',
    price: 280000,
    description: '흰색',
  },
];

const getCartItem = (state) => {
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
};

// 체크된 장바구니 상품 id
const getCheckedId = (state) => {
  const checkedCarts = state.carts.filter((cart) => cart.checked);

  const result = checkedCarts.map((cart) => cart.product_no);

  return result;
};

// 체크된 장바구니 상품 목록
const getCheckedCartItem = (state, getters) => {
  const result = getters.getCheckedId.map((checkedCart) => {
    const carts = getters.getCartItem.find((cart) => cart.product_no === checkedCart);

    return carts;
  });

  return result;
};

// 장바구니 총 수량
const getTotalCount = (state, getters) => {
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
};

// 장바구니 총 금액
const getTotalPrice = (state, getters) => {
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
};
/* } store setting */

describe('Cart List Page', () => {
  /* ******* setting { ******* */
  let fakeState;
  let fakeGetters;
  let store;
  let wrapper;

  /* beforeEach { */
  beforeEach(() => {
    fakeState = {
      carts: [
        {
          product_no: '1111',
          quantity: 1,
          checked: true,
        },
      ],
      products,
    };

    fakeGetters = {
      getCartItem,
      getCheckedId,
      getCheckedCartItem,
      getTotalCount,
      getTotalPrice,
    };

    store = createVuexStore(fakeState, fakeGetters);

    wrapper = makeWrapper(store);
  });
  /* } beforeEach */
  /* ******* } setting ******* */

  /* ******* test { ******* */
  it('CartList page render', () => {
    expect(wrapper.find('[data-test="cartListPage"]').exists()).toBeTruthy();
  });

  it('Header rednder', () => {
    expect(wrapper.find('[data-test="header"]').exists()).toBeTruthy();
  });

  it('Footer rednder', () => {
    expect(wrapper.find('[data-test="footer"]').exists()).toBeTruthy();
  });

  it('List item component render', () => {
    expect(wrapper.findComponent({ name: 'ItemListItem' }).exists()).toBeTruthy();
  });

  it('Total info render', () => {
    expect(wrapper.find('[data-test="totalInfo"]').exists()).toBeTruthy();
  });

  it('장바구니가 비어 있으면 화면에 장바구니가 비어있습니다 라는 안내 문구를 표시한다.', () => {
    // setup
    fakeState = {
      carts: [],
      products,
    };

    // act
    store = createVuexStore(fakeState, fakeGetters);
    wrapper = makeWrapper(store);

    // result - 리스트 아이템
    expect(wrapper.findComponent({ name: 'ItemListItem' }).exists()).toBeFalsy();

    // result 2 - 목록 총 정보
    expect(wrapper.find('[data-test="totalInfo"]').exists()).toBeFalsy();

    // result 3 - 풋터
    expect(wrapper.find('[data-test="footer"]').exists()).toBeFalsy();

    // result 4 - 안내 문구
    expect(wrapper.html()).toContain('장바구니가 비어 있습니다.');
  });

  it('장바구니 목록은 store.state.carts 배열의 개수만큼 렌더링 된다.', () => {
    // setup
    fakeState = {
      carts: [
        { product_no: '1111', quantity: 1 },
        { product_no: '3333', quantity: 3 },
        { product_no: '4444', quantity: 1 },
      ],
      products,
    };

    // act
    store = createVuexStore(fakeState, fakeGetters);
    wrapper = makeWrapper(store);

    // result
    expect(wrapper.findAll('[data-test="cartListItem"]').length).toBe(fakeState.carts.length);
  });

  it('장바구니 총 정보 - 주문 상품 수는 체크된 상품의 수량을 모두 더한 값이다.', () => {
    // setup
    fakeState = {
      carts: [
        { product_no: '1111', quantity: 1, checked: true },
        { product_no: '3333', quantity: 3, checked: true },
        { product_no: '4444', quantity: 6, checked: false },
      ],
      products,
    };
    fakeGetters = {
      getCartItem,
      getTotalCount: (state) => {
        // 체크된 장바구니 상품들
        const checkedCartItems = state.carts.filter((cart) => cart.checked);

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
    };

    // act
    store = createVuexStore(fakeState, fakeGetters);
    wrapper = makeWrapper(store);

    const totalCount = wrapper.find('[data-test="totalCount"]');

    // result
    expect(totalCount.exists()).toBeTruthy();
    expect(totalCount.text()).toBe(String(fakeGetters.getTotalCount(fakeState)));
  });

  it('장바구니 총 정보 - 총 주문 금액은 체크된 상품의 가격을 모두 더한 값이다.', () => {
    // setup
    fakeState = {
      carts: [
        { product_no: '1111', quantity: 1, checked: true },
        { product_no: '3333', quantity: 2, checked: true },
        { product_no: '4444', quantity: 6, checked: false },
      ],
      products,
    };
    fakeGetters = {
      getCartItem,
      getCheckedId,
      getCheckedCartItem,
      getTotalCount,
      getTotalPrice,
    };

    // act
    store = createVuexStore(fakeState, fakeGetters);
    wrapper = makeWrapper(store);

    const totalPrice = wrapper.find('[data-test="totalPrice"]');

    const checked = fakeState.carts.filter((cart) => cart.checked);
    const totalPriceArr = checked.map((check) => {
      const item = products.find((product) => product.product_no === check.product_no);

      return item.price * check.quantity;
    });
    const totalPriceNum = totalPriceArr.reduce((acc, cur) => acc + cur);
    const result = totalPriceNum.toLocaleString();

    // result
    expect(totalPrice.exists()).toBeTruthy();
    expect(totalPrice.text()).toBe(String(result));
  });
  /* ******* } test ******* */
});
