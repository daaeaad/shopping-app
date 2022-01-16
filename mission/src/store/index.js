import { createStore } from 'vuex';

export default createStore({
  state: {
    // data

    // 로그인된 사용자
    loggedUser: {
      status: 1,
      data: [
        {
          likeProduct: ['p1', 'p2', 'p3'],
        },
      ],
    },

    // 판매자
    userCompany: {
      status: 1,
      data: [
        {
          companyName: '다애스토어', // 상호명
          imgProfile: [
            'https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk',
          ], // 프로필사진(대표이미지)
          tags: ['페미닌', '프렌치시크', '러블리', '캐주얼', '오버핏'], // 해시태그(배열)
        },
      ],
    },

    // 상품
    product: {
      status: 1,
      data: [
        {
          id: 'p1',
          name: 'Merino Wool Pullover', // 상품명
          imgMain: [
            'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y',
          ], // 대표 이미지(배열)
          price: 160000, // 가격(원래가격)
          isDiscount: true, // 할인여부(Boolean)
          discoutPercent: 10, // 할인율
          discountPrice: 144000, // 할인가격
          description:
            '<div style="font-size:12px; line-height:1.5">100% 메리노 울 원사로 제작 된 풀어보 니트 입니다.<br/>도톰한 중량감으로 한 겨울에 이너웨어로 착용하기 좋습니다.<br/>네크라인이 깊어 여성스러운 핏을 연출합니다.<br/><br/>혼용률 : MERINO WOOL 100%<br/><br/>세탁: 반드시 드라이크리닝을 하시기 바랍니다.<br/><br/>모델 사이즈<br/>174cm / 상의: s / 하의: m</div><br/><div><img src="https://i.picsum.photos/id/1010/5184/3456.jpg?hmac=7SE0MNAloXpJXDxio2nvoshUx9roGIJ_5pZej6qdxXs" alt="" style="width:100%; height:auto;"><img src="https://i.picsum.photos/id/1059/7360/4912.jpg?hmac=vVWk1qyiXN_VgPhpNqFm3yl2HUPW6fHqYOjTHYO2bHQ" alt="" style="width:100%; height:auto;"></div>', // 상품 설명(html형태)
          isPossibleOrder: true, // 주문 가능 여부(Boolean)
          whyOrderNotPossible: '', // 주문 불가능 사유(품절, 일시품절 등)
          totalLike: 12000, // 총 찜 횟수
          totalOrder: 1130, // 총 구매 횟수
          totalReview: 5, // 총 리뷰수
          totalRating: 4.3, // 총 별점
          material: 'MERIONO WOOL 100%', // 상품소재
          manufacturer: '다애모직', // 제조사
          country: 'Korea', // 제조국
          isWriteOption: true, // 상품 옵션 작성 여부 (Boolean)
          optionName: ['color', 'size'],
          option: {
            color: ['Black', 'Ivory', 'Navy'], // 색상(배열)
            size: {
              // 사이즈
              small: [
                { totalLength: 58 },
                { sholderWidth: 42 },
                { chestWidth: 50 },
                { sleeveLength: 62 },
                { hemWidth: 22 },
              ],
              medium: [
                { totalLength: 60 },
                { sholderWidth: 44 },
                { chestWidth: 52 },
                { sleeveLength: 64 },
                { hemWidth: 24 },
              ],
              large: [
                { totalLength: 62 },
                { sholderWidth: 42 },
                { chestWidth: 54 },
                { sleeveLength: 66 },
                { hemWidth: 26 },
              ],
            },
          },
        },
      ],
    },

    // 리뷰
    review: {
      status: 1,
      data: [
        {
          ownerName: 'daaeaad', // 작성자 닉네임
          createdAt: '2022-01-28 22:33:44', // 작성일시(Datetime)
          modifiedAt: '', // 수정일시(Datetime)
          title: '옷이 너무 마음에 들어요.', // 제목
          content:
            '옷이 너무 예뻐요! 지금 같이 추울 때 입기 딱 좋은 두께감 입니다. 도톰한 두께에 비해 핏이 부해보이지 않습니다. 요즘 너무 자주 입는 옷이에요.', // 내용
          img: [
            'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',
          ], // 이미지(1개)
          rating: 4, // 별점
          optionInfo: '[COLOR] Black, [SIZE] Small', // 구매옵션 정보 (db의 유저테이블에서 가져올지 아니면 구매내역테이블이 따로 생길지 모르기 때문에 일단 유저가 직접 리뷰에 작성하는걸로 가정함)
        },
        {
          ownerName: 'daaeaad2', // 작성자 닉네임
          createdAt: '2022-01-28 22:33:44', // 작성일시(Datetime)
          modifiedAt: '2022-01-30 22:33:44', // 수정일시(Datetime)
          title: '맘에 들어요', // 제목
          content: '너무 마음에 드네요!', // 내용
          img: [], // 이미지(1개)
          rating: 4, // 별점
          optionInfo: '[COLOR] Gray, [SIZE] Medium', // 구매옵션 정보 (db의 유저테이블에서 가져올지 아니면 구매내역테이블이 따로 생길지 모르기 때문에 일단 유저가 직접 리뷰에 작성하는걸로 가정함)
        },
      ],
    },
  },
  mutations: {
    // 사용자 찜 목록 변경
    changeUserLike: (state, payload) => {
      const { status } = state.loggedUser;
      if (!status) {
        return false;
      }

      // 찜한 상품 배열
      let { likeProduct } = state.loggedUser.data[0];
      // 찜한 상품 배열에 현재 상품이 있는지 확인
      const findProduct = likeProduct.find((item) => item === payload);

      if (!findProduct) {
        // 없을 경우 현재 상품을 찜상품 배열에 추가
        likeProduct.push(payload);
      } else {
        // 있으면 찜상품에서 현재 상품을 제외
        likeProduct = likeProduct.filter((item) => item !== payload);
      }

      // state에 변경사항 업데이트
      state.loggedUser.data[0].likeProduct = likeProduct;
      // console.log(state.loggedUser.data[0].likeProduct);

      return true;
    },
  },
  actions: {},
  getters: {
    // 상품 데이터 반환
    getProduct: (state) => {
      const { product } = state;
      if (!product.status) {
        return false;
      }
      return product.data[0];
    },

    // 상품의 현재 가격
    getProductCurrentPrice: (state, getters) => {
      if (!getters.getProduct) {
        return false;
      }

      // 할인여부, 원래가격, 할인가격
      const { isDiscount, price, discountPrice } = getters.getProduct;

      // 할인중이면 할인가격을, 아니면 원래가격을 결과값으로 할당
      const result = isDiscount ? discountPrice : price;

      return result;
    },

    // 판매자(스토어) 데이터 반환
    getStore: (state) => {
      const { userCompany } = state;
      if (!userCompany.status) {
        return false;
      }
      return userCompany.data[0];
    },

    // 리뷰 데이터 반환
    getReview: (state) => {
      const { review } = state;
      if (!review.status) {
        return false;
      }

      // 리뷰 데이터 배열의 객체에 접근
      const reviewData = review.data.map((item) => {
        // 작성일시와 수정일시에서 시분초 제외
        const createdAt = item.createdAt.split(' ')[0];
        const modifiedAt = item.modifiedAt.split(' ')[0];
        // 변경된 내용 업데이트
        return { ...item, createdAt, modifiedAt };
      });
      // 가공한 데이터 반환
      return reviewData;
    },

    // 로그인된 사용자 데이터
    getUser: (state) => {
      const { loggedUser } = state;
      if (!loggedUser.status) {
        return false;
      }
      return loggedUser.data[0];
    },

    // 사용자가 찜한 상품인지 확인
    getisLike: (state, getters) => {
      if (!getters.getUser) {
        return false;
      }
      if (!getters.getProduct) {
        return false;
      }

      // 사용자의 찜한상품 배열
      const { likeProduct } = getters.getUser;
      // 현재 상품의 고유id 가져오기
      const { id } = getters.getProduct;

      // 찜한상품 배열에 현재 상품이 있는지 확인
      const isLike = likeProduct.filter((item) => item === id);

      if (!isLike.length) {
        // 찜한 상품이 아니면
        return false;
      }

      // 찜한 상품이 맞으면
      return true;
    },

    // 상품 옵션: 컬러
    getOptionColor: (state, getters) => {
      if (!getters.getProduct) {
        return false;
      }
      // 상품의 옵션 세부 정보
      const { color } = getters.getProduct.option;
      // 컬러 배열을 문자열로 바꿔 결과값으로 할당한다.
      const result = color.join(', ');
      // 결과값 반환
      return result;
    },

    getOptionSize: (state, getters) => {
      if (!getters.getProduct) {
        return false;
      }
      const result = [];
      // 상품의 옵션 세부 정보
      const { size } = getters.getProduct.option;
      Object.entries(size).forEach(([key]) => result.push(key));
      return result;
    },
  },
  modules: {},
});
