import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Order from '@/views/Order.vue';
import realStore from '@/store';

describe('주문하기 페이지', () => {
  let wrapper;
  let state;
  let getters;
  beforeEach(() => {
    state = {
      ...realStore.state,
      user: {
        name: '홍길동',
        email: 'test@test.com',
        tel: '01088889999',
        delivery: {
          name: '홍길동',
          address1: '012345',
          address2: '서울특별시 OO구 OO로 000-00',
          address3: 'OO오피스텔 000호',
          tel: '01088889999',
        },
      },
    };

    getters = {
      ...realStore.getters,
      getUser: (state) => {
        const result = state.user;

        return result;
      },
    };

    const store = createStore({ ...realStore, state, getters });

    wrapper = mount(Order, {
      global: {
        provide: { store },
      },
    });
  });

  it('page render', () => {
    expect(wrapper.find('#order-page').exists()).toBeTruthy();
  });

  it('userInfo', () => {
    expect(wrapper.find('[data-test="userInfo"]').exists()).toBeTruthy();

    expect(wrapper.find('[data-test="userName"]').exists()).toBeTruthy();

    expect(wrapper.find('[data-test="userName"]').find('input').element.value).toContain();
  });
});
