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

  it('옵션 정보가 있으면 작성된 옵션명 데이터를 반환합니다.', () => {
    const option = ['color', 'size'];
    const result = !option.length ? false : option;
    expect(result).toEqual(['color', 'size']);
  });

  it('옵션 중 color는 문자열로 세부 정보를 반환합니다.', () => {
    const optionData = {
      color: ['Black', 'White'],
    };
    let result;
    result = optionData.color.join(', ');
    expect(result).toBe('Black, White');
  });

  it('getters.getOptionSize 은 사이즈 객체의 키값을 배열로 반환합니다.', () => {
    const data = {
      color: ['Black', 'White'],
      size: {
        small: [
          { totalLength: 58 },
          { sholderWidth: 42 },
          { chestWidth: 50 },
          { sleeveLength: 62 },
          { hemWidth: 22 },
        ],
        medium: [
          { totalLength: 58 },
          { sholderWidth: 42 },
          { chestWidth: 50 },
          { sleeveLength: 62 },
          { hemWidth: 22 },
        ],
      },
    };
    const result = [];
    Object.entries(data.size).forEach(([key]) => result.push(key));

    expect(result).toEqual(['small', 'medium']);
  });
});

describe('userCompany(store) data', () => {
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
});

describe('review data', () => {
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
