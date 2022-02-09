import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import ItemListItem from '@/components/ItemList/ItemListItem.vue';

describe('ItemListItem', () => {
  const product = {
    id: 'p1',
    image: 'sampleUrl1',
    name: '회색 가디건',
    original_price: 10000,
    price: 8000,
    description: '가나다라',
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(ItemListItem, {
      props: product,
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
    const wrapper = mount(ItemListItem);
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
/* } router test 끝 */
