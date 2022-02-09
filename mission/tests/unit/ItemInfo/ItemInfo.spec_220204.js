import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);
    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });
});

/* 상품 대표 이미지 { */
describe('상품 대표 이미지', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('상품 대표 이미지 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="itemInfoVisual"]').exists()).toBeTruthy();
  });

  it('data option의 status가 0일 경우, 화면에는 이미지를 불러올 수 없다는 메시지를 띄웁니다.', async () => {
    await wrapper.setData({ status: 0 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoVisual_1"]').exists()).toBeFalsy();
    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoVisual_0"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="message"]').text()).toBe('이미지를 불러올 수 없습니다.');
  });

  it('data option의 status가 1일 경우, 이미지 태그를 렌더링합니다.', async () => {
    await wrapper.setData({ status: 1 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoVisual_1"]').exists()).toBeTruthy();
    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoVisual_0"]').exists()).toBeFalsy();

    // 이미지
    expect(wrapper.find('[data-test="imgMain"]').exists()).toBeTruthy();
  });

  it('img 태그의 src 속성에는 data의 이미지 url이 들어갑니다.', async () => {
    const url = 'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y';
    await wrapper.setData({
      status: 1,
      product: {
        imgMain: [url],
      },
    });

    expect(wrapper.find('[data-test="imgMain"]').attributes('src')).toBe(url);
  });
});
/* } 상품 대표 이미지 끝 */

/* 판매자 정보 { */
describe('판매자 정보', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('판매자 정보 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="itemStoreInfo"]').exists()).toBeTruthy();
  });

  it('data option의 status가 0일 경우, 화면에는 판매자 정보를 불러올 수 없다는 메시지를 띄웁니다.', async () => {
    await wrapper.setData({ status: 0 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemStoreInfo_1"]').exists()).toBeFalsy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemStoreInfo_0"]').exists()).toBeTruthy();

    // 안내 메시지
    expect(wrapper.find('[data-test="itemStoreInfo_0"]').find('[data-test="message"]').text()).toBe(
      '판매자 정보를 불러올 수 없습니다.  고객센터로 문의해주세요.',
    );
  });

  it('data option의 status가 1일 경우, 화면에는 판매자 정보를 불러올 영역을 렌더링 합니다.', async () => {
    await wrapper.setData({ status: 1 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemStoreInfo_1"]').exists()).toBeTruthy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemStoreInfo_0"]').exists()).toBeFalsy();
  });

  it('판매자 정보 영역에는 프로필 이미지, 상호명, 해시태그를 불러올 엘리먼트가 있습니다.', () => {
    const itemStoreInfo = wrapper.find('[data-test="itemStoreInfo_1"]');

    // 프로필 이미지
    expect(itemStoreInfo.find('[data-test="imgProfile"]')).toBeTruthy();
    // 상호명
    expect(itemStoreInfo.find('[data-test="companyName"]')).toBeTruthy();
    // 해시태그
    expect(itemStoreInfo.find('[data-test="tags"]')).toBeTruthy();
  });

  it('판매자의 프로필 이미지 경로는 data option의 product.store.imgProfile 입니다.', async () => {
    const url = 'https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk';
    await wrapper.setData({
      product: {
        store: { imgProfile: [url] },
      },
    });

    expect(wrapper.find('[data-test="imgProfile"]').attributes('src')).toBe(url);
  });

  it('판매자의 상호명은 data option의 product.store.name 입니다.', async () => {
    const companyName = '다애스토어';
    await wrapper.setData({
      product: {
        store: { companyName },
      },
    });

    expect(wrapper.find('[data-test="companyName"]').text()).toBe(companyName);
  });

  it('판매자의 해시태그는 data option의 product.store.tags 배열의 길이만큼 엘리먼트를 렌더링 합니다.', async () => {
    const tags = ['tag1', 'tag2', 'tag3'];
    await wrapper.setData({
      product: {
        store: {
          tags,
        },
      },
    });

    expect(wrapper.findAll('[data-test="tag_item"]').length).toBe(tags.length);
  });
});
/* } 판매자 정보 끝 */

/* 상품 기본 정보 { */
describe('상품 기본 정보', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('상품 기본 정보를 불러올 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="ItemInfoBasicInfo"]').exists()).toBeTruthy();
  });

  it('data option의 status가 0이면, 가격 정보를 불러올 수 없다는 메시지를 화면에 띄웁니다.', async () => {
    await wrapper.setData({ status: 0 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="ItemInfoBasicInfo_1"]').exists()).toBeFalsy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="ItemInfoBasicInfo_0"]').exists()).toBeTruthy();
  });

  it('data option의 status가 1이면, 정보를 불러올 영역을 렌더링 합니다.', async () => {
    await wrapper.setData({ status: 1 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="ItemInfoBasicInfo_1"]').exists()).toBeTruthy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="ItemInfoBasicInfo_0"]').exists()).toBeFalsy();
  });

  it('상품 기본 정보 영역에는 상품명, 상품 가격을 불러올 엘리먼트가 있습니다.', () => {
    const itemStoreInfo = wrapper.find('[data-test="ItemInfoBasicInfo_1"]');

    // 상품명
    expect(itemStoreInfo.find('[data-test="pname"]')).toBeTruthy();
    // 가격
    expect(itemStoreInfo.find('[data-test="price"]')).toBeTruthy();
  });

  it('상품명은 data option의 product.name을 화면에 출력합니다.', async () => {
    const name = '따뜻한 니트';
    await wrapper.setData({ product: { name } });

    expect(wrapper.find('[data-test="pname"]').text()).toBe(name);
  });

  it('주문이 불가능한 상태이면, 가격 대신 주문이 불가능하다는 메시지를 띄울 영역을 렌더링하고 data option의 product.whyOrderNotPossible을 화면에 출력 합니다.', async () => {
    const whyOrderNotPossible = '품절';
    await wrapper.setData({ product: { isPossibleOrder: false, whyOrderNotPossible } });

    expect(wrapper.find('[data-test="isPossibleOrder_0"]').exists()).toBeTruthy();

    expect(wrapper.find('[data-test="isPossibleOrder_1"]').exists()).toBeFalsy();

    expect(
      wrapper.find('[data-test="isPossibleOrder_0"]').find('[data-test="message"]').text(),
    ).toBe(whyOrderNotPossible);
  });

  it('상품의 현재 가격은 data option의 product.currentPrice를 3자리마다 콤마를 찍어 출력합니다.', async () => {
    const currentPrice = 10000;
    await wrapper.setData({ product: { originalPrice: 20000, currentPrice } });

    const getLocalePrice = (price) => price.toLocaleString();

    expect(wrapper.find('[data-test="currentPrice"]').text()).toBe(getLocalePrice(currentPrice));
  });

  it('할인 중이 아니라면, 상품의 원래 가격과 할인율을 출력할 영역은 렌더링하지 않습니다.', async () => {
    await wrapper.setData({ product: { originalPrice: 10000, currentPrice: 10000 } });

    expect(wrapper.find('[data-test="originalPrice"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="discountPercent"]').exists()).toBeFalsy();
  });

  it('할인 중이면, 상품의 원래 가격과 할인율을 출력할 영역을 렌더링 합니다.', async () => {
    await wrapper.setData({ product: { originalPrice: 10000, currentPrice: 8000 } });

    expect(wrapper.find('[data-test="originalPrice"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="discountPercent"]').exists()).toBeTruthy();
  });

  it('할인 중이면, 상품의 원래 가격으로 data option의 product.originalPrice를 3자리마다 콤마를 찍어 출력합니다.', async () => {
    const originalPrice = 10000;
    await wrapper.setData({ product: { originalPrice, currentPrice: 8000 } });

    const getLocalePrice = (price) => price.toLocaleString();

    expect(wrapper.find('[data-test="originalPrice"]').text()).toBe(getLocalePrice(originalPrice));
  });

  it('할인 중이면, 계산된 할인율에 %를 붙여 화면에 출력합니다.', async () => {
    const originalPrice = 10000;
    const currentPrice = 8000;
    await wrapper.setData({
      product: {
        originalPrice,
        currentPrice,
      },
    });

    const getDiscountPercent = ((originalPrice - currentPrice) / originalPrice) * 100;

    expect(wrapper.find('[data-test="discountPercent"]').text()).toBe(`${getDiscountPercent}%`);
  });
});
/* } 상품 기본 정보 끝 */

/* 상품 상세 설명 { */
describe('상품 상세 설명', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('상품 상세 설명 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="itemInfoDetail"]').exists()).toBeTruthy();
  });

  it('data option의 status가 0이면, 상품 설명을 불러올 수 없다는 메시지를 화면에 출력합니다.', async () => {
    await wrapper.setData({ status: 0 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoDetail_1"]').exists()).toBeFalsy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoDetail_0"]').exists()).toBeTruthy();

    expect(
      wrapper.find('[data-test="itemInfoDetail_0"]').find('[data-test="message"]').text(),
    ).toBe('상품 설명을 불러올 수 없습니다.');
  });

  it('data option의 status가 1이면, 상품 설명을 불러올 영역을 렌더링 합니다.', async () => {
    await wrapper.setData({ status: 1 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoDetail_1"]').exists()).toBeTruthy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoDetail_0"]').exists()).toBeFalsy();
  });

  it('상품의 상세 설명은 data option의 product.description을 html 형식으로 렌더링 합니다.', async () => {
    const description = '<p>상세 설명 입니다.</p>';
    await wrapper.setData({ product: { description } });

    expect(wrapper.find('[data-test="description"]').html()).toContain(description);
  });
});
/* } 상품 상세 설명 끝 */

/* 리뷰 { */
describe('리뷰', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('리뷰 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="itemInfoReview"]').exists()).toBeTruthy();
  });

  it('data option의 status가 0이면, 리뷰를 불러올 수 없다는 메시지를 화면에 출력합니다.', async () => {
    await wrapper.setData({ status: 0 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoReview_1"]').exists()).toBeFalsy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoReview_0"]').exists()).toBeTruthy();

    expect(
      wrapper.find('[data-test="itemInfoReview_0"]').find('[data-test="message"]').text(),
    ).toBe('리뷰를 불러올 수 없습니다.새로고침을 하거나 고객센터에 문의해주세요.');
  });

  it('data option의 status가 1이면, 리뷰 리스트를 불러올 영역을 렌더링 합니다.', async () => {
    await wrapper.setData({ status: 1 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoReview_1"]').exists()).toBeTruthy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoReview_0"]').exists()).toBeFalsy();
  });

  it('만약 작성된 리뷰가 없으면, 아직 작성된 리뷰가 없다는 메시지를 화면에 출력합니다.', async () => {
    const review = [];
    await wrapper.setData({
      product: {
        review,
      },
    });

    // 리뷰가 없을 때 보여줄 영역
    expect(wrapper.find('[data-test="review_0"]').exists()).toBeTruthy();
    // 리뷰가 있을 때 보여줄 영역
    expect(wrapper.find('[data-test="review_1"]').exists()).toBeFalsy();
    // 리뷰가 없을 때 메세지
    expect(wrapper.find('[data-test="review_0"]').find('[data-test="message"]').text()).toBe(
      '아직 작성된 리뷰가 없습니다.',
    );
  });

  it('리뷰가 있으면, data option의 product.review 배열의 길이만큼 엘리먼트를 렌더링 합니다.', async () => {
    const review = [
      {
        ownerName: 'test1',
        createdAt: '2022-01-27 22:33:44',
        modifiedAt: '',
        title: '맘에 들어요 111',
        content: '너무 마음에 드네요! 111',
        img: [
          'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',
        ],
        optionInfo: '[COLOR] Black, [SIZE] Small',
      },
      {
        ownerName: 'test2',
        createdAt: '2022-01-28 22:33:44',
        modifiedAt: '2022-01-30 22:33:44',
        title: '맘에 들어요 222',
        content: '너무 마음에 드네요! 222',
        img: [],
        optionInfo: '[COLOR] Gray, [SIZE] Medium',
      },
    ];
    await wrapper.setData({
      product: { review },
    });

    expect(wrapper.findAll('[data-test="reviewItem"]').length).toBe(review.length);
  });

  it('리뷰 영역의 제목에 리뷰의 총 개수를 출력합니다.', () => {
    const review = [
      {
        ownerName: 'test1',
      },
      {
        ownerName: 'test2',
      },
    ];
    wrapper.setData({ product: review });

    const countReview = wrapper.find('[data-test="countReview"]');

    expect(countReview.exists()).toBeTruthy();

    expect(countReview.text()).toBe(`리뷰(${review.length})`);
  });
});
/* } 리뷰 끝 */

/* 리뷰 내용 { */
describe('리뷰 내용', () => {
  const review = [
    {
      ownerName: 'test1',
      createdAt: '2022-01-27 22:33:44',
      modifiedAt: '',
      title: '맘에 들어요 111',
      content: '너무 마음에 드네요! 111',
      img: [
        'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',
      ],
      optionInfo: '[COLOR] Black, [SIZE] Small',
    },
    {
      ownerName: 'test2',
      createdAt: '2022-01-28 22:33:44',
      modifiedAt: '2022-01-30 22:33:44',
      title: '맘에 들어요 222',
      content: '너무 마음에 드네요! 222',
      img: [],
      optionInfo: '[COLOR] Gray, [SIZE] Medium',
    },
  ];
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
    wrapper.setData({ product: { review } });
  });

  it('리뷰에는 작성자, 구매한 옵션 정보, 본문 텍스트 내용이 있고, data option의 product.review 에서 해당 데이터를 렌더링 합니다.', async () => {
    // 작성자
    const ownerName = wrapper.findAll('[data-test="ownerName"]');

    // 구매한 옵션 정보
    const optionInfo = wrapper.findAll('[data-test="optionInfo"]');

    // 본문 텍스트 내용
    const content = wrapper.findAll('[data-test="content"]');

    review.forEach((item, index) => {
      expect(ownerName.at(index).text()).toBe(item.ownerName);
      expect(optionInfo.at(index).text()).toBe(item.optionInfo);
      expect(content.at(index).text()).toBe(item.content);
    });
  });

  it('리뷰 데이터에 수정한 날짜가 없으면 처음 작성한 날짜(createdAt)를, 리뷰를 수정한 날짜가 있으면 수정한 날짜(modifiedAt)와 ~에 수정됨을 렌더링 합니다. 날짜는 시분초를 자르고 연월일만 출력 합니다.', async () => {
    const lastDate = wrapper.findAll('[data-test="lastDate"]');
    expect(lastDate.length).toBe(review.length);

    const getOnlyDate = (date) => date.split(' ')[0];

    const getLastDate = (createdAt, modifiedAt) => (!modifiedAt ? getOnlyDate(createdAt) : `${getOnlyDate(modifiedAt)} 에 수정됨`);

    review.forEach((item, index) => {
      const date = getLastDate(item.createdAt, item.modifiedAt);
      expect(lastDate.at(index).text()).toBe(date);
    });
  });

  it('리뷰에 업로드된 이미지가 있으면 이미지 영역과 해당 이미지를 렌더링 합니다.', async () => {
    const reviewImg = wrapper.findAll('[data-test="reviewImg"]');
    reviewImg.forEach((item, index) => {
      expect(reviewImg.at(index).attributes().src).toBe(review[index].img[0]);
    });
  });
});
/* } 리뷰 내용 끝 */

/* 화면 하단 고정 버튼 { */
describe('화면 하단 고정 버튼', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('하단 고정 버튼 영역을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="itemInfoButton"]')).toBeTruthy();
  });

  it('data option의 status가 0일 경우, 버튼에 상품 정보를 불러오지 못했다는 메시지를 띄웁니다.', async () => {
    await wrapper.setData({ status: 0 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoButton_1"]').exists()).toBeFalsy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoButton_0"]').exists()).toBeTruthy();

    // 안내 메시지
    expect(
      wrapper.find('[data-test="itemInfoButton_0"]').find('[data-test="message"]').text(),
    ).toBe(
      '상품 정보를 불러오지 못해 지금은 구매할 수 없습니다.새로고침을 하거나 고객센터에 문의해주세요.',
    );
  });

  it('data option의 status가 1이면, 찜 버튼과 구매 버튼을 렌더링 합니다.', async () => {
    await wrapper.setData({ status: 1 });

    // 데이터를 정상적으로 불러왔을 때 영역
    expect(wrapper.find('[data-test="itemInfoButton_1"]').exists()).toBeTruthy();

    // 데이터를 정상적으로 불러오지 못했을 때 영역
    expect(wrapper.find('[data-test="itemInfoButton_0"]').exists()).toBeFalsy();
  });
});
/* } 화면 하단 고정 버튼 끝 */

/* 찜 버튼 { */
describe('찜 버튼', () => {
  let wrapper;
  const loggedUser = { likeProduct: ['p1', 'p2', 'p3'] };
  const product = {
    id: 'p1',
    isPossibleOrder: true,
    whyOrderNotPossible: '',
    originalPrice: 10000,
    currentPrice: 8000,
  };
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
    wrapper.setData({
      status: 1,
      loggedUser,
      product,
    });
  });

  it('찜 버튼을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="btnLike"]').exists()).toBeTruthy();
  });

  it('사용자가 찜한 상품이 맞으면 찜 버튼 아이콘 스타일이 활성화 됩니다.', () => {
    const btnLike = wrapper.find('[data-test="btnLike"]').find('.btn_like');

    expect(btnLike.classes('act')).toBeTruthy();
    expect(btnLike.attributes('name')).toBe('heart');
  });

  it('찜 버튼을 클릭하면 methods의 handleBtnLike가 실행되고, handleBtnLike는 찜한 상품 목록에서 현재 상품을 추가하거나 삭제합니다.', () => {
    const likeProduct = ['p2', 'p3'];
    const id = 'p1';

    const mockFn = jest.fn().mockImplementation(() => {
      let result;
      const arr = likeProduct;

      // 찜한 상품 배열에 현재 상품이 있는지 확인
      const findProduct = arr.find((item) => item === id);

      if (!findProduct) {
        arr.push(id);
        result = arr;
      } else {
        result = arr.filter((item) => item !== id);
      }

      return result;
    });

    const test = mockFn();

    expect(test).toEqual(['p2', 'p3', 'p1']);
  });

  it('구매하기 버튼을 렌더링 합니다.', () => {
    expect(wrapper.find('[data-test="btnPurchase"]').exists()).toBeTruthy();
  });

  it('주문 가능 여부가 false이면, 구매하기 버튼은 비활성화 되고, 주문 불가능한 사유를 텍스트로 출력 합니다.', async () => {
    const isPossibleOrder = false;
    const whyOrderNotPossible = '품절';
    await wrapper.setData({ product: { isPossibleOrder, whyOrderNotPossible } });

    const btnPurchase = wrapper.find('[data-test="btnPurchase"]');

    expect(btnPurchase.attributes('disabled')).toBe('');
    expect(btnPurchase.text()).toBe(whyOrderNotPossible);
  });

  it('주문 가능 여부가 true이면, 구매하기 버튼은 상품의 현재 가격 + 구매하기 텍스트를 출력 합니다.', () => {
    const btnPurchase = wrapper.find('[data-test="btnPurchase"]');

    const currentPrice = product.currentPrice.toLocaleString(); // 8,000

    expect(btnPurchase.text()).toBe(`${currentPrice}원 구매하기`);
  });
});
/* } 찜 버튼 끝 */
