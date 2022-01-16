import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import store from '@/store';
import ItemInfoPage from '@/views/ItemInfo.vue';
import ItemInfoVisual from '@/components/ItemInfoVisual.vue';
import ItemInfoStoreInfo from '@/components/ItemInfoStoreInfo.vue';
import ItemInfoBasicInfo from '@/components/ItemInfoBasicInfo.vue';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });
});

describe('ItemInfoVisual', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoVisual, {
      global: {
        plugins: [store],
      },
    });
  });

  it('상품 대표 이미지 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="itemInfoVisual"]').exists()).toBeTruthy();
  });

  it('대표 이미지를 불러올 엘리먼트를 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="imgMain"]').exists()).toBeTruthy();
  });

  it('상품 대표 이미지 경로는 getters의 getProduct를 통해 url을 가져옵니다.', () => {
    const imgMain = wrapper.find('[data-test="imgMain"]');
    const data = store.getters.getProduct;
    expect(imgMain.attributes().src).toEqual(data.imgMain[0]);
  });
});

describe('ItemStoreInfo', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoStoreInfo, {
      global: {
        plugins: [store],
      },
      data() {
        return { store: store.getters.getStore };
      },
    });
  });

  it('판매자 정보를 불러올 영역을 렌더링 합니다.', () => {
    const itemStoreInfo = wrapper.find('[data-test="itemStoreInfo"]');
    expect(itemStoreInfo.exists()).toBeTruthy();
  });

  it('판매자 프로필 사진을 불러올 엘리먼트를 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="imgProfile"]').exists()).toBeTruthy();
  });

  it('판매자 프로필 사진 url은 store.state.getStore을 통해 가져옵니다.', () => {
    const data = store.getters.getStore;
    expect(wrapper.find('[data-test="imgProfile"]').attributes().src).toBe(data.imgProfile[0]);
  });

  it('판매자 상호명을 불러올 엘리먼트를 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="companyName"]').exists()).toBeTruthy();
  });

  it('판매자 상호명은 store.state.getStore을 통해 companyName을 가져옵니다.', () => {
    const data = store.getters.getStore;
    expect(wrapper.find('[data-test="companyName"]').text()).toBe(data.companyName);
  });

  it('판매자의 해시태그를 불러올 엘리먼트를 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="tags"]').exists()).toBeTruthy();
  });

  it('판매자 해시태그 개수는 store.state.userCompany의 tags 배열의 길이과 같습니다.', () => {
    const tags = wrapper.find('[data-test="tags"]').findAll('[data-test="tag_item"]');
    const data = store.getters.getStore;
    const tagsArr = data.tags;
    expect(tags.length).toBe(tagsArr.length);
  });
});

describe('ItemInfoBasicInfo', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoBasicInfo, {
      global: {
        plugins: [store],
      },
    });
  });

  const { product } = store.state;

  it('상품 기본 정보를 불러올 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('#ItemInfoBasicInfo').exists()).toBeTruthy();
  });

  it('상품명을 불러올 엘리먼트를 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="pname"]').exists()).toBeTruthy();
  });

  it('상품명은 store.state.product의 name을 가져옵니다.', () => {
    const data = store.getters.getProduct;
    expect(wrapper.find('[data-test="pname"]').text()).toBe(data.name);
  });

  it('가격을 불러올 엘리먼트를 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="price"]').exists()).toBeTruthy();
  });

  it('상품이 할인중이면 원래가격과 할인율을 표시할 엘리먼트를 렌더링 합니다.', () => {
    const discountPrice = wrapper.find('[data-test="discountPrice"]');

    expect(discountPrice.exists()).toBeTruthy();
  });

  it('상품이 할인중이면 할인가격이 표시될 엘리먼트를 렌더링 합니다.', () => {
    const data = store.getters.getProduct;
    const { isDiscount } = data;
    let discountPrice;
    if (isDiscount) {
      discountPrice = wrapper.find('[data-test="discountPrice"]');
    }
    expect(discountPrice.exists()).toBeTruthy();
  });

  it('상품이 할인중이면 할인율과 할인 가격을 불러옵니다.', () => {
    const data = store.getters.getProduct;
    const isDiscount = true;
    let discountPrice;
    if (isDiscount) {
      discountPrice = `${data.discoutPercent} ${data.discountPrice}`;
    }
    expect(discountPrice).toBe(`${data.discoutPercent} ${data.discountPrice}`);
  });
});
