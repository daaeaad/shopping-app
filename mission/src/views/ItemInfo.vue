<template>
  <!-- 상품 상세 페이지 { -->
  <div id="item-info-page" class="padding_fixbtn">
    <!-- 상품 대표 사진 영역 { -->
    <div id="itemInfoVisual" data-test="itemInfoVisual">
      <div class="img_box square">
        <div class="inner">
          <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
          <div v-if="!status" data-test="itemInfoVisual_0" class="img_frame flex row align_center">
            <p data-test="message" class="lay_1 txt size_12 align_center padding_20 color_9b">
              이미지를 불러올 수 없습니다.
            </p>
          </div>
          <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

          <!-- 데이터를 정상적으로 불러온 경우 { -->
          <div v-if="status" data-test="itemInfoVisual_1" class="img_frame">
            <!-- 이미지 -->
            <img :src="getImgUrl" alt="" data-test="imgMain" />
          </div>
        </div>
        <!-- } 데이터를 정상적으로 불러온 경우 -->
      </div>
    </div>
    <!-- } 상품 대표 사진 영역 -->

    <!-- 판매자 정보 영역 { -->
    <div id="itemStoreInfo" data-test="itemStoreInfo" class="padding_rl_15">
      <div class="blank_box_15"></div>

      <!-- 데이터를 정상적으로 불러오지 못할 경우 { -->
      <div v-if="!status" data-test="itemStoreInfo_0">
        <div class="txt_frame">
          <p data-test="message" class="txt size_12 align_center padding_20 color_9b">
            판매자 정보를 불러올 수 없습니다.
            <br />
            고객센터로 문의해주세요.
          </p>
        </div>
      </div>
      <!-- } 데이터를 정상적으로 불러오지 못할 경우 -->

      <!-- 데이터를 정상적으로 불러온 경우 { -->
      <div v-if="status" data-test="itemStoreInfo_1" class="flex row align_center">
        <!-- 클릭시 판매자 프로필로 링크 이동 -->
        <a href="#" class="flex row align_center">
          <!-- 프로필 사진 -->
          <div class="img_frame circle profile">
            <!-- 이미지 -->
            <img :src="product.store.imgProfile" alt="" data-test="imgProfile" />
          </div>
          <!-- / 프로필 사진 -->

          <div class="txt_frame align_left">
            <p data-test="companyName" class="txt size_12">
              <!-- 상호명 -->
              {{ product.store.companyName }}
            </p>
            <div data-test="tags">
              <!-- 해시태그 -->
              <span
                data-test="tag_item"
                v-for="(tag, index) in product.store.tags"
                :key="index"
                class="txt size_10"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </a>
      </div>
      <!-- } 데이터를 정상적으로 불러온 경우 -->
      <div class="blank_box_15"></div>
    </div>
    <!-- } 판매자 정보 영역 -->

    <!-- 상품 기본 정보 : 상품명, 가격 -->
    <!-- 상품 기본 정보 영역 { -->
    <div id="ItemInfoBasicInfo" data-test="ItemInfoBasicInfo" class="padding_rl_15">
      <div class="blank_box_15"></div>

      <!-- 데이터를 정상적으로 불러오지 못할 경우 { -->
      <div v-if="!status" data-test="ItemInfoBasicInfo_0">
        <p class="lay_1 txt size_12 align_center padding_20 color_9b">
          가격 정보를 불러올 수 없습니다.
        </p>
      </div>
      <!-- } 데이터를 정상적으로 불러오지 못할 경우 -->

      <!-- 데이터를 정상적으로 불러온 경우 { -->
      <div v-if="status" data-test="ItemInfoBasicInfo_1">
        <!-- 상품명 -->
        <p data-test="pname" class="txt size_14 align_left weight_b">
          {{ product.name }}
        </p>

        <div class="blank_box_15"></div>

        <div class="lay_1 align_left" data-test="price">
          <!-- 주문 불가능한 상태일 경우 { -->
          <div data-test="isPossibleOrder_0" v-if="!product.isPossibleOrder">
            <div class="ment_box">
              <p data-test="message" class="lay_1 txt size_12 align_center padding_20">
                <!-- 주문 불가능한 사유 -->
                {{ product.whyOrderNotPossible }}
              </p>
            </div>
          </div>
          <!-- } 주문 불가능한 상태일 경우 -->

          <!-- 주문 가능한 상태일 경우 { -->
          <div data-test="isPossibleOrder_1" v-if="product.isPossibleOrder">
            <!-- 할인 중이면 원래 가격을 표시 -->
            <p
              data-test="originalPrice"
              v-if="isDiscount"
              class="txt size_12 color_aa txt_line_through"
            >
              {{ getLocalePrice(product.originalPrice) }}
            </p>

            <div class="flex row">
              <!-- 할인 중이면 할인율 표시 -->
              <p
                data-test="discountPercent"
                v-if="isDiscount"
                class="txt size_16 color_red weight_b"
              >
                {{ getDiscountPercent }}%
              </p>
              <div class="blank_box_10"></div>
              <p class="txt size_12">
                <!-- 상품 현재 가격
              할인 중이면 할인된 가격,
              할인 중이 아니면 원래 가격 표시 -->
                <b data-test="currentPrice" class="size_16 weight_b">
                  {{ getLocalePrice(product.currentPrice) }}
                </b>
                원
              </p>
            </div>
          </div>
          <!-- } 주문 가능한 상태일 경우 -->
        </div>
      </div>
      <!-- } 데이터를 정상적으로 불러온 경우 -->
      <div class="blank_box_15"></div>
    </div>
    <!-- } 상품 기본 정보 영역 -->

    <div class="line hori"></div>

    <!-- 상품 상세 설명 -->
    <!-- 상품 상세 설명 영역 { -->
    <div id="itemInfoDetail" data-test="itemInfoDetail" class="padding_rl_15 align_left">
      <div class="blank_box_15"></div>

      <!-- 제목 -->
      <p class="txt size_14 weight_b">상품 설명</p>
      <div class="blank_box_15"></div>

      <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
      <div v-if="!status" data-test="itemInfoDetail_0">
        <p data-test="message" class="lay_1 txt size_12 align_center padding_20 color_9b">
          상품 설명을 불러올 수 없습니다.
        </p>
      </div>
      <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

      <!-- 데이터를 정상적으로 불러온 경우 { -->
      <div v-if="status" data-test="itemInfoDetail_1">
        <!-- 상세 설명 (html형식) -->
        <div data-test="description" v-html="product.description"></div>
      </div>
      <!-- } 데이터를 정상적으로 불러온 경우 -->

      <div class="blank_box_15"></div>
    </div>
    <!-- } 상품 상세 설명 영역 -->

    <div class="line hori"></div>

    <!-- 리뷰 -->
    <!-- 리뷰 { -->
    <div id="itemInfoReview" data-test="itemInfoReview" class="padding_rl_15 align_left">
      <div class="blank_box_15"></div>

      <!-- 제목 -->
      <p data-test="countReview" class="txt size_14 weight_b">
        <!-- 리뷰 개수 -->
        리뷰({{ getCountReviews }})
      </p>
      <!-- / 제목 -->

      <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
      <div data-test="itemInfoReview_0" v-if="!status">
        <div class="txt_frame">
          <p data-test="message" class="txt size_12 align_center padding_20 color_9b">
            리뷰를 불러올 수 없습니다.<br />새로고침을 하거나 고객센터에 문의해주세요.
          </p>
        </div>
      </div>
      <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

      <!-- 데이터를 정상적으로 불러온 경우 { -->
      <div data-test="itemInfoReview_1" v-if="status">
        <!-- 작성된 리뷰가 없을 경우 { -->
        <div data-test="review_0" v-if="!getReviews">
          <div class="txt_frame">
            <p data-test="message" class="txt size_12 align_center padding_20 color_9b">
              아직 작성된 리뷰가 없습니다.
            </p>
          </div>
        </div>
        <!-- } 작성된 리뷰가 없을 경우 -->

        <!-- 작성된 리뷰가 있을 경우 { -->
        <ul data-test="review_1" v-if="getReviews">
          <!-- 반복될 내용 { -->
          <li data-test="reviewItem" v-for="(review, index) in getReviews" :key="index">
            <div class="blank_box_15"></div>

            <!-- 상단 -->
            <div class="flex row justify_space_between">
              <!-- 작성자 -->
              <p data-test="ownerName" class="txt size_12 color_9b weight_m">
                {{ review.ownerName }}
              </p>
              <!-- 작성일 || (수정된 게시물일 경우)수정일 -->
              <p data-test="lastDate" class="txt size_12 color_9b weight_m">
                {{ getLastDate(review.createdAt, review.modifiedAt) }}
              </p>
            </div>
            <!-- / 상단 -->

            <div class="blank_box_10"></div>

            <!-- 구매한 옵션 정보 -->
            <p data-test="optionInfo" class="txt size_12 weight_b color_9b">
              {{ review.optionInfo }}
            </p>

            <div class="blank_box_10"></div>

            <!-- 본문 -->
            <div class="flex row justify_space_between">
              <!-- 본문 텍스트 내용 -->
              <p data-test="content" class="txt size_12 line_height_15">
                {{ review.content }}
              </p>

              <!-- 리뷰 이미지 -->
              <div class="img_box square" v-if="getReviewImg(review.img)">
                <div class="inner">
                  <div class="img_frame">
                    <!-- 이미지 -->
                    <img :src="getReviewImg(review.img)" alt="" data-test="reviewImg" />
                  </div>
                </div>
              </div>
              <!-- / 리뷰 이미지 -->
            </div>
            <!-- / 본문 -->
            <div class="blank_box_15"></div>
            <div class="line hori"></div>
          </li>
          <!-- } 반복될 내용 -->
        </ul>

        <!-- } 작성된 리뷰가 있을 경우 -->
      </div>
      <!-- } 데이터를 정상적으로 불러온 경우 -->

      <div class="blank_box_15"></div>
    </div>
    <!-- } 리뷰 끝 -->

    <!-- 화면 고정 버튼: 찜, 구매 -->
    <!-- 구매 버튼 영역 { -->
    <div id="itemInfoButton" data-test="itemInfoButton" class="">
      <div class="btn_frame">
        <!-- 데이터를 정상적으로 불러오지 못할 경우 { -->
        <div data-test="itemInfoButton_0" v-if="!status">
          <p data-test="message" class="txt size_14 weight_b color_white">
            상품 정보를 불러오지 못해 지금은 구매할 수 없습니다.<br />새로고침을 하거나 고객센터에
            문의해주세요.
          </p>
        </div>
        <!-- } 데이터를 정상적으로 불러오지 못할 경우 -->

        <!-- 데이터를 정상적으로 불러온 경우 { -->
        <div data-test="itemInfoButton_1" v-if="status" class="flex row align_center lay_1">
          <!-- 버튼: 찜하기 -->
          <button type="button" data-test="btnLike" @click="handleBtnLike">
            <ion-icon
              class="btn_like"
              :name="getIsLikeProduct ? 'heart' : 'heart-empty'"
              :class="getIsLikeProduct ? 'act' : ''"
            ></ion-icon>
          </button>
          <!-- / 버튼: 찜하기 -->

          <div class="line verti"></div>

          <!-- 버튼: 구매하기 -->
          <button
            type="button"
            data-test="btnPurchase"
            class="lay_1"
            :disabled="!product.isPossibleOrder"
          >
            <p class="txt size_14 weight_b color_white lay_1">
              <!-- 주문 가능 여부를 확인,
            주문 가능할 경우, 현재 가격과 구매하기 텍스트
            주문 불가능할 경우, 주문 불가능 사유 텍스트-->
              {{ getBtnPurchaseText }}
            </p>
          </button>
          <!-- / 버튼: 구매하기 -->
        </div>
        <!-- } 데이터를 정상적으로 불러온 경우 -->
      </div>
    </div>
    <!-- } 구매 버튼 영역 -->
  </div>
  <!-- } 상품 상세 페이지 -->
</template>

<script>
export default {
  name: 'ItemInfoPage',
  components: {},
  data() {
    return {
      status: 1,
      loggedUser: {
        likeProduct: ['p1', 'p2', 'p3'],
      },
      product: {
        id: 'p1',
        name: 'Merino Wool Pullover',
        imgMain: [
          'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y',
        ],
        originalPrice: 160000,
        currentPrice: 144000,
        description:
          '<div style="font-size:12px; line-height:1.5">100% 메리노 울 원사로 제작 된 풀어보 니트 입니다.<br/>도톰한 중량감으로 한 겨울에 이너웨어로 착용하기 좋습니다.<br/>네크라인이 깊어 여성스러운 핏을 연출합니다.<br/><br/>혼용률 : MERINO WOOL 100%<br/><br/>세탁: 반드시 드라이크리닝을 하시기 바랍니다.<br/><br/>모델 사이즈<br/>174cm / 상의: s / 하의: m</div><br/><div><img src="https://i.picsum.photos/id/1010/5184/3456.jpg?hmac=7SE0MNAloXpJXDxio2nvoshUx9roGIJ_5pZej6qdxXs" alt="" style="width:100%; height:auto;"><img src="https://i.picsum.photos/id/1059/7360/4912.jpg?hmac=vVWk1qyiXN_VgPhpNqFm3yl2HUPW6fHqYOjTHYO2bHQ" alt="" style="width:100%; height:auto;"></div>',
        isPossibleOrder: true,
        whyOrderNotPossible: '',
        totalLike: 12000,
        totalOrder: 1130,
        totalReview: 5,
        totalRating: 4.3,
        material: 'MERIONO WOOL 100%',
        manufacturer: '다애모직',
        country: 'Korea',
        isWriteOption: true,
        optionName: ['color', 'size'],
        option: {
          color: ['Black', 'Ivory', 'Navy'],
          size: {
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

        // 판매자
        store: {
          companyName: '다애스토어',
          imgProfile: [
            'https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk',
          ],
          tags: ['페미닌', '프렌치시크', '러블리', '캐주얼', '오버핏'],
        },

        // 리뷰
        review: [
          {
            ownerName: 'daaeaad',
            createdAt: '2022-01-28 22:33:44',
            modifiedAt: '',
            title: '옷이 너무 마음에 들어요.',
            content:
              '옷이 너무 예뻐요! 지금 같이 추울 때 입기 딱 좋은 두께감 입니다. 도톰한 두께에 비해 핏이 부해보이지 않습니다. 요즘 너무 자주 입는 옷이에요.',
            img: [
              'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',
            ],
            rating: 4,
            optionInfo: '[COLOR] Black, [SIZE] Small',
          },
          {
            ownerName: 'daaeaad2',
            createdAt: '2022-01-28 22:33:44',
            modifiedAt: '2022-01-30 22:33:44',
            title: '맘에 들어요',
            content: '너무 마음에 드네요!',
            img: [],
            rating: 4,
            optionInfo: '[COLOR] Gray, [SIZE] Medium',
          },
        ],
      },
    };
  },
  methods: {
    getDateOnly(date) {
      return date.split(' ')[0];
    },

    handleBtnLike() {
      let result;
      const { likeProduct } = this.loggedUser;
      const { id } = this.product;

      // 찜한 상품 배열에 현재 상품이 있는지 확인한다.
      const isLikeProduct = this.getIsLikeProduct;
      if (!isLikeProduct) {
        // 없으면 배열에 추가
        likeProduct.push(id);
        result = likeProduct;
      } else {
        // 있으면 배열에서 삭제
        result = likeProduct.filter((item) => item !== id);
      }

      // 변경사항 데이터에 업데이트
      this.loggedUser.likeProduct = result;
    },
  },
  computed: {
    getImgUrl() {
      if (!this.status) {
        return false;
      }
      return this.product.imgMain[0];
    },

    isDiscount() {
      const result = this.product.originalPrice !== this.product.currentPrice;
      return result;
    },

    getLocalePrice() {
      const result = (price) => price.toLocaleString();
      return result;
    },

    getDiscountPercent() {
      const { currentPrice, originalPrice } = this.product;
      const result = ((originalPrice - currentPrice) / originalPrice) * 100;
      return result;
    },

    getReviews() {
      const { review } = this.product;
      const result = !review.length ? false : review;
      return result;
    },

    getLastDate() {
      const result = (createdAt, modifiedAt) => (!modifiedAt ? this.getDateOnly(createdAt) : `${this.getDateOnly(modifiedAt)} 에 수정됨`);
      return result;
    },

    getCountReviews() {
      const result = this.product.review.length;
      return result;
    },

    getReviewImg() {
      const result = (imgArr) => (!imgArr.length ? false : imgArr[0]);
      return result;
    },

    getIsLikeProduct() {
      const { likeProduct } = this.loggedUser;
      const { id } = this.product;
      let result = likeProduct.filter((item) => item === id);
      result = !!result.length;
      return result;
    },

    getBtnPurchaseText() {
      const { isPossibleOrder, whyOrderNotPossible, currentPrice } = this.product;

      let result;
      if (!isPossibleOrder) {
        result = whyOrderNotPossible;
      } else {
        result = `${this.getLocalePrice(currentPrice)}원 구매하기`;
      }

      return result;
    },
  },
};
</script>

<style scoped>
#itemInfoReview .img_box {
  width: 60px;
  min-width: 60px;
}

#itemInfoButton {
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
}
#itemInfoButton .btn_frame {
  width: 100%;
  height: auto;
  padding: 0;
  background-color: #444;
}
#itemInfoButton button {
  padding: var(--px_20);
}
.btn_like {
  color: #fff;
  font-size: 16px;
  font-size: 1.34rem;
  transition: 0.3s;
}
.btn_like.act {
  color: #ff5f5f;
}
</style>
