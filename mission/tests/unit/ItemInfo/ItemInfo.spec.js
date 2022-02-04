import { shallowMount } from '@vue/test-utils';
import { useRoute } from 'vue-router';
import ItemInfoPage from '@/views/ItemInfo.vue';
import Client from '@/repositories/Clients/AxiosClient';
import Repository from '@/repositories/RepositoryFactory';

// router mocking
jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
}));

// axios mocking
jest.mock('@/repositories/Clients/AxiosClient');

describe('ItemInfoPage', () => {
  /* component setting { */
  const id = 'aa11';

  const item = {
    name: '회색가디건',
    image: 'imgurl',
    original_price: 10000,
    price: 8000,
    description: '<p>따뜻해</p>',
    seller: {
      name: 'AA스토어',
      profile_image: 'profile url',
      hash_tags: ['tag1', 'tag2', 'tag3'],
    },
    reviews: [
      {
        title: '제목1',
        content: '가나다라마바사',
        writer: '작성자A',
        created: '2022.02.04',
        img: '',
      },
      {
        title: '제목2',
        content: '아자차카타파하',
        writer: '작성자B',
        created: '2022.02.05',
        img: 'review img url',
      },
    ],
  };
  const res = {
    data: {
      item,
    },
  };
  let wrapper;
  beforeEach(async () => {
    // set params
    await Client.get.mockImplementation(() => res);
    await useRoute.mockImplementationOnce(() => ({
      params: {
        id,
      },
    }));

    // shallowMount component
    wrapper = shallowMount(ItemInfoPage);
  });
  /* } component setting 끝 */

  /* 페이지 렌더링 { */
  it('redners ItemInfoPage', () => {
    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });
  /* } 페이지 렌더링 끝 */

  /* api 호출, 라우트 파라미터 확인 { */
  it('api 호출 테스트', async () => {
    // setup

    // act
    const ItemRepository = Repository.get('item');
    const getDetail = await ItemRepository.getDetail(id);

    // result - 호출 여부
    expect(Client.get).toHaveBeenCalled();
    // result - api 주소 확인
    expect(Client.get).toHaveBeenCalledWith(`/item/${id}`);
    // result - 호출 결과
    expect(getDetail).toEqual(item);
  });
  /* } api 호출, 라우트 파라미터 확인 끝 */

  /* 대표 이미지 { */
  it('대표 이미지 렌더링', () => {
    // setup
    const itemInfoVisual = wrapper.find('[data-test="itemInfoVisual"]');
    const imgElement = wrapper.find('[data-test="itemInfoVisual_1"]').find('img');

    // result - exists
    expect(itemInfoVisual.exists()).toBe(true);
    expect(imgElement.exists()).toBe(true);

    // result - img attributes
    expect(imgElement.attributes('src')).toBe(item.image);
    expect(imgElement.attributes('alt')).toBe(item.name);
  });
  /* } 대표 이미지 끝 */

  /* 판매자 정보 { */
  it('판매자 정보 렌더링', () => {
    // setup
    const itemStoreInfo = wrapper.find('[data-test="itemStoreInfo"]');

    // result - exists
    expect(itemStoreInfo.exists()).toBe(true);
  });

  it('판매자 프로필 이미지 렌더링', () => {
    // setup
    const imgProfile = wrapper.find('[data-test="imgProfile"]');

    // result - exists
    expect(imgProfile.exists()).toBe(true);
    // result - attributes
    expect(imgProfile.attributes('src')).toBe(item.seller.profile_image);
    expect(imgProfile.attributes('alt')).toBe(item.seller.name);
  });

  it('판매자 상호명 렌더링', () => {
    // setup
    const companyName = wrapper.find('[data-test="companyName"]');

    // result - exists
    expect(companyName.exists()).toBe(true);
    // result - text
    expect(companyName.text()).toBe(item.seller.name);
  });

  it('판매자 해시태그 렌더링', () => {
    // setup
    const tags = wrapper.find('[data-test="tags"]');
    const tagItem = wrapper.findAll('[data-test="tag_item"]');
    const tagArr = item.seller.hash_tags;
    const tagLength = tagArr.length;

    // result - exists
    expect(tags.exists()).toBe(true);
    // result - length
    expect(tagItem.length).toBe(tagLength);
    // result - text
    tagArr.forEach((tag, index) => {
      expect(tagItem[index].text()).toBe(`#${tag}`);
    });
  });
  /* } 판매자 정보 끝 */

  /* 상품 기본 정보 { */
  it('상품 기본 정보 영역 렌더링', () => {
    const ItemInfoBasicInfo = wrapper.find('[data-test="ItemInfoBasicInfo"]');

    expect(ItemInfoBasicInfo.exists()).toBe(true);
  });

  it('상품명 렌더링', () => {
    const pname = wrapper.find('[data-test="pname"]');

    expect(pname.exists()).toBe(true);
    expect(pname.text()).toBe(item.name);
  });

  it('상품가격 영역 렌더링', () => {
    const price = wrapper.find('[data-test="price"]');
    const currentPrice = wrapper.find('[data-test="currentPrice"]');

    expect(price.exists()).toBe(true);
    expect(currentPrice.exists()).toBe(true);
    expect(currentPrice.text()).toBe(item.price.toLocaleString());
  });

  it('할인 중일 경우 원래가격과 할인율 렌더링', () => {
    const originalPrice = wrapper.find('[data-test="originalPrice"]');
    const discountPercent = wrapper.find('[data-test="discountPercent"]');

    // 할인 여부
    const isDiscount = item.original_price !== item.price;

    // 할인율
    const discountRate = Math.floor(
      ((item.original_price - item.price) / item.original_price) * 100,
    );

    expect(originalPrice.exists()).toBe(isDiscount);
    expect(originalPrice.text()).toBe(item.original_price.toLocaleString());

    expect(discountPercent.exists()).toBe(isDiscount);
    expect(discountPercent.text()).toBe(`${discountRate}%`);
  });
  /* } 상품 기본 정보 끝 */

  /* 상품 상세 설명 { */
  it('상세설명 영역 렌더링', () => {
    const itemInfoDetail = wrapper.find('[data-test="itemInfoDetail"]');
    const description = wrapper.find('[data-test="description"]');

    expect(itemInfoDetail.exists()).toBe(true);
    expect(description.exists()).toBe(true);

    expect(description.html()).toContain(item.description);
  });
  /* } 상품 상세 설명 끝 */

  /* 리뷰 { */
  it('리뷰 영역 렌더링', () => {
    const itemInfoReview = wrapper.find('[data-test="itemInfoReview"]');

    expect(itemInfoReview.exists()).toBe(true);
  });

  it('리뷰 개수', () => {
    const countReview = wrapper.find('[data-test="countReview"]');

    expect(countReview.exists()).toBe(true);
    expect(countReview.text()).toBe(`리뷰(${item.reviews.length})`);
  });

  it('리뷰가 있으면 작성된 개수 만큼 반복될 영역과 내용을 렌더링', () => {
    // setup
    const reviewItem = wrapper.findAll('[data-test="reviewItem"]');
    const reviewArr = item.reviews;

    // result - 리뷰 개수
    expect(reviewItem.length).toBe(reviewArr.length);

    reviewArr.forEach((review, index) => {
      const reviewEle = reviewItem[index];

      // result - 작성자
      expect(reviewEle.find('[data-test="writer"]').exists()).toBe(true);
      expect(reviewEle.find('[data-test="writer"]').text()).toBe(review.writer);

      // result - 작성일
      expect(reviewEle.find('[data-test="created"]').exists()).toBe(true);
      expect(reviewEle.find('[data-test="created"]').text()).toBe(review.created);

      // result - 제목
      expect(reviewEle.find('[data-test="title"]').exists()).toBe(true);
      expect(reviewEle.find('[data-test="title"]').text()).toBe(review.title);

      // result - 본문
      expect(reviewEle.find('[data-test="content"]').exists()).toBe(true);
      expect(reviewEle.find('[data-test="content"]').text()).toBe(review.content);

      // result - 리뷰 이미지
      const isImg = !!review.img;
      expect(reviewEle.find('[data-test="reviewImg"]').exists()).toBe(isImg);
      if (reviewEle.find('[data-test="reviewImg"]').exists()) {
        expect(reviewEle.find('[data-test="reviewImg"]').attributes('src')).toBe(review.img);
        expect(reviewEle.find('[data-test="reviewImg"]').attributes('alt')).toBe(review.title);
      } else {
        expect(reviewEle.find('[data-test="reviewImg"]').exists()).toBe(false);
      }
    });
  });
  /* } 리뷰 끝 */

  /* 화면 고정 버튼 { */
  it('고정 버튼 영역 렌더링', () => {
    const itemInfoButton = wrapper.find('[data-test="itemInfoButton"]');

    expect(itemInfoButton.exists()).toBe(true);
  });

  it('구매하기 버튼', () => {
    const btnPurchase = wrapper.find('[data-test="btnPurchase"]');

    expect(btnPurchase.exists()).toBe(true);
    expect(btnPurchase.text()).toBe(`${item.price.toLocaleString()}원 구매하기`);
  });

  it('찜 버튼', () => {
    const btnLike = wrapper.find('[data-test="btnLike"]');

    expect(btnLike.exists()).toBe(true);
  });
  /* } 화면 고정 버튼 끝 */
});
