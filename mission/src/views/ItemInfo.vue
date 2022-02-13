<template>
  <!-- 헤더 { -->
  <transition name="slide">
    <Header
      data-test="header"
      v-show="!isScrollDown"
      :class="{ slideUp: isScrollDown }"
      btn="back"
    />
  </transition>
  <!-- } 헤더 끝 -->

  <!-- 상품 상세 페이지 { -->
  <div id="item-info-page" class="padding_fixbtn" :style="{ paddingTop: `${headerHeight}px` }">
    <!-- 상품 대표 사진 영역 { -->
    <div id="itemInfoVisual" data-test="itemInfoVisual">
      <div class="img_box square">
        <div class="inner">
          <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
          <div v-if="!product" data-test="itemInfoVisual_0" class="img_frame flex row align_center">
            <p data-test="message" class="lay_1 txt size_12 align_center padding_20 color_9b">
              이미지를 불러올 수 없습니다.
            </p>
          </div>
          <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

          <!-- 데이터를 정상적으로 불러온 경우 { -->
          <div v-if="product" data-test="itemInfoVisual_1" class="img_frame">
            <!-- 이미지 -->
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              data-test="imgMain"
            />
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
      <div v-if="!product" data-test="itemStoreInfo_0">
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
      <div v-if="product" data-test="itemStoreInfo_1" class="flex row align_center">
        <!-- 클릭시 판매자 프로필로 링크 이동 -->
        <a href="#" class="flex row align_center">
          <!-- 프로필 사진 -->
          <div class="img_frame circle profile">
            <!-- 이미지 -->
            <img
              v-if="seller.profile_image"
              :src="seller.profile_image"
              :alt="seller.name"
              data-test="imgProfile"
            />
          </div>
          <!-- / 프로필 사진 -->

          <div class="txt_frame align_left">
            <p data-test="companyName" class="txt size_12">
              <!-- 상호명 -->
              {{ seller.name }}
            </p>
            <div data-test="tags" v-if="seller.hash_tags">
              <!-- 해시태그 -->
              <span
                data-test="tag_item"
                class="txt size_10"
                v-for="(tag, index) in seller.hash_tags"
                :key="index"
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
      <div v-if="!product" data-test="ItemInfoBasicInfo_0">
        <p class="lay_1 txt size_12 align_center padding_20 color_9b">
          가격 정보를 불러올 수 없습니다.
        </p>
      </div>
      <!-- } 데이터를 정상적으로 불러오지 못할 경우 -->

      <!-- 데이터를 정상적으로 불러온 경우 { -->
      <div v-if="product" data-test="ItemInfoBasicInfo_1">
        <!-- 상품명 -->
        <p data-test="pname" class="txt size_14 align_left weight_b">
          {{ product.name }}
        </p>

        <div class="blank_box_15"></div>

        <div class="lay_1 align_left" data-test="price">
          <!-- 할인 중이면 원래 가격을 표시 -->
          <p
            data-test="originalPrice"
            v-if="isDiscount"
            class="txt size_12 color_aa txt_line_through"
          >
            {{ originalPrice }}
          </p>

          <div class="flex row">
            <!-- 할인 중이면 할인율 표시 -->
            <p data-test="discountPercent" v-if="true" class="txt size_16 color_red weight_b">
              {{ discountPercent }}%
            </p>
            <div class="blank_box_10"></div>
            <p class="txt size_12">
              <!-- 상품 현재 가격
              할인 중이면 할인된 가격,
              할인 중이 아니면 원래 가격 표시 -->
              <b data-test="currentPrice" class="size_16 weight_b">
                {{ currentPrice }}
              </b>
              원
            </p>
          </div>
        </div>
        <!-- } 주문 가능한 상태일 경우 -->
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
      <div v-if="!product" data-test="itemInfoDetail_0">
        <p data-test="message" class="lay_1 txt size_12 align_center padding_20 color_9b">
          상품 설명을 불러올 수 없습니다.
        </p>
      </div>
      <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

      <!-- 데이터를 정상적으로 불러온 경우 { -->
      <div v-if="product" data-test="itemInfoDetail_1">
        <!-- 상세 설명 (html형식) -->
        <div data-test="description" v-html="product.description"></div>
        <!-- v-html="product.description" -->
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
        리뷰({{ getTotalReview }})
      </p>
      <!-- / 제목 -->

      <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
      <div data-test="itemInfoReview_0" v-if="!product">
        <div class="txt_frame">
          <p data-test="message" class="txt size_12 align_center padding_20 color_9b">
            리뷰를 불러올 수 없습니다.<br />새로고침을 하거나 고객센터에 문의해주세요.
          </p>
        </div>
      </div>
      <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

      <!-- 데이터를 정상적으로 불러온 경우 { -->
      <div data-test="itemInfoReview_1" v-if="product">
        <!-- 작성된 리뷰가 없을 경우 { -->
        <div data-test="review_0" v-if="!getTotalReview">
          <div class="txt_frame">
            <p data-test="message" class="txt size_12 align_center padding_20 color_9b">
              아직 작성된 리뷰가 없습니다.
            </p>
          </div>
        </div>
        <!-- } 작성된 리뷰가 없을 경우 -->

        <!-- 작성된 리뷰가 있을 경우 { -->
        <ul data-test="review_1" v-if="getTotalReview">
          <!-- 반복될 내용 { -->
          <li data-test="reviewItem" v-for="review in reviews" :key="review.review_no">
            <div class="blank_box_15"></div>

            <!-- 상단 -->
            <div class="flex row justify_space_between">
              <!-- 작성자 -->
              <p data-test="writer" class="txt size_12 color_9b weight_m">
                {{ review.writer }}
              </p>
              <!-- 작성일 || (수정된 게시물일 경우)수정일 -->
              <p data-test="created" class="txt size_12 color_9b weight_m">
                {{ review.created }}
              </p>
            </div>
            <!-- / 상단 -->

            <div class="blank_box_10"></div>

            <!-- 제목 -->
            <p data-test="title" class="txt size_12 weight_b color_9b">
              {{ review.title }}
            </p>

            <div class="blank_box_10"></div>

            <!-- 본문 -->
            <div class="flex row justify_space_between">
              <!-- 본문 텍스트 내용 -->
              <p data-test="content" class="txt size_12 line_height_15">
                {{ review.content }}
              </p>

              <!-- 리뷰 이미지 -->
              <div class="img_box square" v-if="review.img">
                <div class="inner">
                  <div class="img_frame">
                    <!-- 이미지 -->
                    <img data-test="reviewImg" :src="review.img" :alt="review.title" />
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
        <div data-test="itemInfoButton_0" v-if="!product">
          <p data-test="message" class="txt size_14 weight_m color_white">
            상품 정보를 불러오지 못해 지금은 구매할 수 없습니다.<br />새로고침을 하거나 고객센터에
            문의해주세요.
          </p>
        </div>
        <!-- } 데이터를 정상적으로 불러오지 못할 경우 -->

        <!-- 데이터를 정상적으로 불러온 경우 { -->
        <div data-test="itemInfoButton_1" v-if="product" class="flex row align_center lay_1">
          <!-- 버튼: 찜하기 -->
          <div class="blank_box_10"></div>
          <button
            type="button"
            data-test="btnLike"
            class="btn_like position_relative"
            :class="{ act: getIsLike }"
            @click="toggleLike()"
          >
            <!-- icon -->
            <icon name="heart" class="ico heart_line" />
            <icon name="heart-fill" class="ico heart_fill" />
          </button>
          <!-- / 버튼: 찜하기 -->

          <div class="line verti"></div>

          <!-- 버튼: 구매하기 -->
          <button type="button" data-test="btnPurchase" class="lay_1" @click="goOrder()">
            <p class="txt size_14 weight_b color_white lay_1">
              <!-- 현재 가격과 구매하기 텍스트 -->
              {{ currentPrice }}원 구매하기
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
import {
  computed, reactive, ref, toRefs,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

// component
import Header from '@/components/Header.vue';

// api respository
import Repository from '@/repositories/RepositoryFactory';

// composable
import getScrollInfo from '@/composable/getScrollInfo';
import getHeaderHeight from '@/composable/getHeaderHeight';
import getDiscount from '@/composable/getDiscount';
import getLocaleNumber from '@/composable/getLocaleNumber';
import { isLike } from '@/composable/handleWish';

// api repository - item
const ItemRepository = Repository.get('item');
// api repository - wish
const WishRepository = Repository.get('wish');

export default {
  name: 'ItemInfoPage',
  components: { Header },

  setup() {
    // data
    const state = reactive({
      product: {},
      seller: {},
      reviews: [],
      wish: [],
      isDiscount: Boolean,
      discountPercent: 0,
      currentPrice: 0,
      originalPrice: 0,
    });

    // 상품 id
    const route = useRoute();
    const { id } = route.params;

    // api 호출, data 할당
    (async () => {
      const repoDataProduct = await ItemRepository.getDetail(id);
      state.product = repoDataProduct;
      state.seller = repoDataProduct.seller;
      state.reviews = repoDataProduct.reviews;

      // console.log('repoDataProduct :: ', repoDataProduct);

      const repoDataWish = await WishRepository.getList();
      state.wish = repoDataWish;
      // console.log('repoDataWish :: ', repoDataWish);

      // 할인여부, 할인율
      const { isDiscount, discountPercent } = getDiscount(
        state.product.original_price,
        state.product.price,
      );
      state.isDiscount = isDiscount;
      state.discountPercent = discountPercent;

      // 현재 가격
      const { result: currentPrice } = getLocaleNumber(state.product.price);
      state.currentPrice = currentPrice;

      // 원래 가격
      const { result: originalPrice } = getLocaleNumber(state.product.original_price);
      state.originalPrice = originalPrice;
    })();

    // 스크롤 위치
    const { scrollPosition, isScrollDown } = getScrollInfo();
    // header 높이
    const { headerHeight } = getHeaderHeight();

    // 리뷰 개수
    const getTotalReview = computed(() => state.reviews.length);

    // 찜버튼 활성화
    const getIsLike = ref(false);
    const toggleIsLike = () => {
      getIsLike.value = computed(() => isLike(state.wish, state.product.product_no));
    };

    const toggleLike = async () => {
      const post = await WishRepository.postList(state.product.product_no);
      if (!post) {
        console.log(post);
      } else {
        toggleIsLike();
      }
    };

    // 주문하기 페이지로 이동
    const store = useStore();
    const router = useRouter();
    const goOrder = () => {
      const product = [{ product_no: id, quantity: 1 }];
      store.dispatch('handleOrderList', { product });

      router.push({
        name: 'Order',
      });
    };

    // data
    return {
      ...toRefs(state),
      getTotalReview,
      getIsLike,
      toggleLike,
      headerHeight,
      scrollPosition,
      isScrollDown,
      goOrder,
    };
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
