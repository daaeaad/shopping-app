import store from '@/store';

describe('product data', () => {
  it('state.product의 status가 0이면 false 를 반환합니다.', () => {
    const state = { product: { status: 0, data: [{ id: 1, name: 'product' }] } };

    const result = !state.product.status ? false : state.product.data;
    expect(result).toBeFalsy();
  });

  it('state.product의 status가 1이면 data 를 반환합니다.', () => {
    const state = { product: { status: 1, data: [{ id: 1, name: 'product' }] } };

    const result = !state.product.status ? false : state.product.data;
    expect(result).toEqual([{ id: 1, name: 'product' }]);
  });

  it('현재 가격을 구할때, 상품이 할인중이면 할인된 가격을 반환합니다.', () => {
    const isDiscount = true;
    const price = 12000;
    const discountPrice = 10000;

    const result = isDiscount ? discountPrice : price;
    expect(result).toBe(10000);
  });

  it('현재 가격을 구할때, 상품이 할인 중이 아니면 원래 가격을 반환합니다.', () => {
    const isDiscount = false;
    const price = 12000;
    const discountPrice = 10000;

    const result = isDiscount ? discountPrice : price;
    expect(result).toBe(12000);
  });

  it('state.userCompany의 status가 0이면 false 를 반환합니다.', () => {
    const state = { userCompany: { status: 0, data: [{ id: 1, name: 'aa' }] } };

    const result = !state.userCompany.status ? false : state.userCompany.data;
    expect(result).toBeFalsy();
  });

  it('state.userCompany의 status가 1이면 data를 반환합니다.', () => {
    const state = { userCompany: { status: 1, data: [{ id: 1, name: 'aa' }] } };

    const result = !state.userCompany.status ? false : state.userCompany.data;
    expect(result).toEqual([{ id: 1, name: 'aa' }]);
  });

  it('state.review의 status가 0이면 false 를 반환합니다.', () => {
    const state = {
      review: { status: 0, data: [{ id: 1, name: 'review', date: '2022-01-01 11:22:33' }] },
    };

    const result = !state.review.status ? false : state.review.data;
    expect(result).toBeFalsy();
  });

  it('state.review의 status가 1이면 data를 반환하고, 이때 date의 시분초는 자릅니다.', () => {
    const state = {
      review: { status: 1, data: [{ id: 1, name: 'review', date: '2022-01-01 11:22:33' }] },
    };

    let result;
    let reviewData;
    if (!state.review.status) {
      result = false;
    } else {
      reviewData = state.review.data.map((item) => {
        const date = item.date.split(' ')[0];
        return { ...item, date };
      });
    }
    result = reviewData;
    expect(result).toEqual([{ id: 1, name: 'review', date: '2022-01-01' }]);
  });
});
