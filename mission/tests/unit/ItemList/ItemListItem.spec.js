import { shallowMount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import { createStore } from 'vuex';
import ItemListItem from '@/components/ItemList/ItemListItem.vue';
import realStore from '@/store';

describe('ItemListItem', () => {
  const product = {
    id: 'p1',
    image: 'sampleUrl1',
    name: '회색 가디건',
    original_price: 10000,
    price: 8000,
    description: '가나다라',

    isCartList: false,
    isOrderList: false,
    totalPrice: 0,
    quantity: 0,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemListItem, {
      props: product,
      global: {
        provide: {
          store: realStore,
        },
      },
    });
  });

  it('redners ItemListItem', () => {
    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  it('상품 이미지 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="image"]').exists()).toBeTruthy();
  });

  it('상품 이미지 url은 props의 image 입니다.', () => {
    const img = wrapper.find('[data-test="image"]');
    expect(img.attributes('src')).toBe(product.image);
  });

  it('상품명 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="pname"]').exists()).toBeTruthy();
  });

  it('상품명은 setup에서 반환해주는 name 입니다.', () => {
    expect(wrapper.find('[data-test="pname"]').text()).toBe(product.name);
  });

  it('가격을 보여줄 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="price"]').exists()).toBeTruthy();
  });

  it('상품이 할인중이 아니면 할인율을 표시하지 않습니다.', async () => {
    const original_price = 10000;
    const price = 10000;

    await wrapper.setProps({
      original_price,
      price,
    });

    const isDiscount = original_price !== price;

    expect(wrapper.find('[data-test="discountPercent"]').exists()).toBe(isDiscount);
  });

  it('할인 중이면 상품의 할인율 계산하고 %를 붙여 표시합니다. 할인율은 소수점을 자른 정수로 표시 합니다.', () => {
    const discountPercent = wrapper.find('[data-test="discountPercent"]');

    const getDiscountPercent = Math.floor(
      ((product.original_price - product.price) / product.original_price) * 100,
    );

    expect(discountPercent.exists()).toBeTruthy();
    expect(discountPercent.text()).toBe(`${getDiscountPercent}%`);
  });

  it('가격은 현재 가격에 3자리마다 콤마를 찍어 표시 합니다.', () => {
    const price = wrapper.find('[data-test="price"]');

    const getLocalePrice = product.price.toLocaleString();

    const getDiscountPercent = Math.floor(((product.original_price - product.price) / product.original_price) * 100 * 10)
      / 10;

    expect(price.text()).toBe(`${getDiscountPercent}%  ${getLocalePrice}`);
  });

  it('상품 설명을 렌더링 합니다.', () => {
    const description = wrapper.find('[data-test="description"]');

    expect(description.exists()).toBeTruthy();
    expect(description.text()).toBe(product.description);
  });
});

/* router test { */
// vue router mocking
jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}));

describe('router test', () => {
  it('상품 상세 페이지', async () => {
    // setup
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));

    const productNo = '1111';
    const calledData = { name: 'ItemDetail', params: { id: productNo } };
    const wrapper = shallowMount(ItemListItem, {
      global: {
        provide: {
          store: realStore,
        },
      },
    });
    await wrapper.setProps({ product_no: productNo });

    // act 1
    await wrapper.find('[data-test="imageClick"]').trigger('click');

    // result 1
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(calledData);

    // act 2
    await wrapper.find('[data-test="textClick"]').trigger('click');

    // result 2
    expect(push).toHaveBeenCalledTimes(2);
    expect(push).toHaveBeenCalledWith(calledData);
  });
});

/* store setting { */
const createVuexStore = (fakeState, fakeGetters, fakeActions, fakeMutations) => createStore({
  state() {
    return fakeState;
  },
  mutations: fakeMutations,
  actions: fakeActions,
  getters: fakeGetters,
});

const makeWrapper = (store, props) => shallowMount(ItemListItem, {
  props,
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

const deleteCart = ({ state, commit }, { id }) => {
  if (id === 'all') {
    commit('deleteAllItem');
  } else {
    const item = state.carts.find((cart) => cart.product_no === id);
    if (item) {
      commit('deleteItem', { id });
    }
  }
};

const deleteItem = (state, { id }) => {
  const newCarts = state.carts.filter((cart) => cart.product_no !== id);
  state.carts = newCarts;
};
/* } store setting */

describe('장바구니 목록', () => {
  let fakeState;
  let fakeGetters;
  let fakeActions;
  let fakeMutations;
  let store;
  let wrapper;

  const product = {
    isCartList: true,
    isOrderList: false,
    product_no: 'p1234',
    image: 'image url',
    name: '가디건',
    original_price: 10000,
    price: 8000,
    description: '회색',
    quantity: 3,
    totalPrice: 24000,
  };

  beforeEach(() => {
    fakeState = {
      carts: [
        {
          product_no: 'p1234',
          quantity: 3,
          checked: true,
        },
      ],
      products,
    };

    fakeGetters = {
      getCheckedId,
      getCheckedCartItem,
    };

    fakeActions = {
      deleteCart,
    };

    fakeMutations = {
      deleteItem,
    };

    store = createVuexStore(fakeState, fakeGetters, fakeActions, fakeMutations);
    wrapper = makeWrapper(store, product);
  });

  it('장바구니 목록일때, 상단에 체크박스와 삭제버튼이 렌더링 된다.', () => {
    expect(wrapper.find('[data-test="cartButtons"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cartCheckbox"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cartDeleteBtn"]').exists()).toBeTruthy();
  });

  it('체크박스는 처음 렌더링 되었을때 체크된 상태이다.', () => {
    const checkbox = wrapper.find('[data-test="cartCheckbox"]');

    expect(checkbox.element.checked).toBeTruthy();
  });

  it('체크박스를 클릭하면 체크가 해제된다.', async () => {
    const checkbox = wrapper.find('[data-test="cartCheckbox"]');

    await checkbox.trigger('click');

    expect(checkbox.element.checked).toBeFalsy();
  });

  it('수량 증가 버튼을 클릭할때 1씩 증가한다.', async () => {
    const btnIncrement = wrapper.find('[data-test="btnIncrement"]');
    const quantityTxt = wrapper.find('[data-test="inputQuantity"]');
    const { quantity } = fakeState.carts[0];

    expect(quantityTxt.exists()).toBeTruthy();
    expect(btnIncrement.exists()).toBeTruthy();

    expect(quantityTxt.element.value).toBe(String(quantity));

    await btnIncrement.trigger('click');

    expect(quantityTxt.element.value).toBe(String(quantity + 1));
  });

  it('수량 감소 버튼을 클릭할때 1씩 감소한다.', async () => {
    const btnDecrement = wrapper.find('[data-test="btnDecrement"]');
    const quantityTxt = wrapper.find('[data-test="inputQuantity"]');
    const { quantity } = fakeState.carts[0];

    expect(quantityTxt.exists()).toBeTruthy();
    expect(btnDecrement.exists()).toBeTruthy();

    expect(quantityTxt.element.value).toBe(String(quantity));

    await btnDecrement.trigger('click');

    expect(quantityTxt.element.value).toBe(String(quantity - 1));
  });
});
