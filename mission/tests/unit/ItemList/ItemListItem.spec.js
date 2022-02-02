import { mount } from '@vue/test-utils';
import ItemListItem from '@/components/ItemList/ItemListItem.vue';

describe('ItemListItem', () => {
  const product = {
    id: 'p1',
    imgMain: ['sampleUrl1'],
    store: { companyName: '다애스토어' },
    name: '회색 가디건',
    originalPrice: 10000,
    currentPrice: 8000,
    totalLike: 122,
    likeProduct: ['p1'],
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemListItem, { propsData: { product } });
  });

  it('redners ItemListItem', () => {
    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  it('상품 이미지 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="img"]').exists()).toBeTruthy();
  });

  it('상품 이미지 url은 data option의 imgMain 입니다.', () => {
    const img = wrapper.find('[data-test="img"]');
    expect(img.attributes('src')).toBe(product.imgMain[0]);
  });

  it('판매자 상호명 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="companyName"]').exists()).toBeTruthy();
  });

  it('판매자 상호명은 data option의 companyName 입니다. ', () => {
    expect(wrapper.find('[data-test="companyName"]').text()).toBe(product.store.companyName);
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
    await wrapper.setProps({ product: { originalPrice: 1000, currentPrice: 1000 } });

    expect(wrapper.find('[data-test="discountPercent"]').exists()).toBeFalsy();
  });

  it('할인 중이면 상품의 할인율 계산하고 %를 붙여 표시합니다. 할인율은 소수점을 자른 정수로 표시 합니다.', async () => {
    const discountPercent = wrapper.find('[data-test="discountPercent"]');

    const getDiscountPercent = Math.floor(
      ((product.originalPrice - product.currentPrice) / product.originalPrice) * 100,
    );

    expect(discountPercent.exists()).toBeTruthy();
    expect(discountPercent.text()).toBe(`${getDiscountPercent}%`);
  });

  it('가격은 현재 가격에 3자리마다 콤마를 찍어 표시 합니다.', () => {
    const price = wrapper.find('[data-test="price"]');

    const getLocalePrice = product.currentPrice.toLocaleString();

    const getDiscountPercent = Math.floor(
      ((product.originalPrice - product.currentPrice) / product.originalPrice) * 100 * 10,
    ) / 10;

    expect(price.text()).toBe(`${getDiscountPercent}%  ${getLocalePrice}`);
  });

  it('상품의 총 찜 횟수를 렌더링 합니다. 총 찜 횟수는 숫자 3자리마다 콤마가 찍힙니다.', () => {
    const totalLike = wrapper.find('[data-test="totalLike"]');

    const totalLikeVal = product.totalLike.toLocaleString();

    expect(totalLike.exists()).toBeTruthy();
    expect(totalLike.text()).toBe(totalLikeVal);
  });
});
