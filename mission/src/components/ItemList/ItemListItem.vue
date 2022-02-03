<template>
  <div class="item-list-item">
    <div class="img_box ratio ratio_10_7 position_relative">
      <div class="inner">
        <div
          data-test="imageClick"
          class="img_frame dis_block overflow_hidden"
          @click="goItemDetail"
        >
          <!-- 상품 이미지 -->
          <img data-test="image" :src="image" :alt="name" class="" />
        </div>
      </div>

      <!-- 찜 버튼 { -->
      <div class="btn_frame">
        <!-- 버튼
         - 아이콘 스타일 활성화: .btn_like에 .act 클래스 추가 -->

        <button type="button" class="btn_like position_relative" :class="{ act: isLike }">
          <icon name="heart" class="ico heart_line" />
          <icon name="heart-fill" class="ico heart_fill" />
        </button>
      </div>
      <!-- } 찜 버튼 -->
    </div>

    <div class="txt_box align_left padding_10 padding_rl_15">
      <div data-test="textClick" class="dis_block lay_1" @click="goItemDetail">
        <div class="blank_box_10"></div>

        <!-- 상품명 -->
        <p data-test="pname" class="txt size_12 weight_m line_height_13 color_66">
          {{ name }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 가격 -->
        <p data-test="price" class="txt size_14 weight_b">
          <!-- 할인율: 할인중일때만 표시 -->
          <span data-test="discountPercent" class="color_red" v-if="isDiscount">
            {{ discountPercent }}%
          </span>
          {{ currentPrice }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 상품 설명 -->
        <p data-test="description" class="txt size_12 weight_m color_98 txt_overflow_1">
          {{ description }}
        </p>

        <div class="blank_box_10"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import getDiscount from '@/composable/getDiscount';
import getLocaleNumber from '@/composable/getLocaleNumber';

export default {
  name: 'ItemListItem',
  props: {
    product_no: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    original_price: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    isLike: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { original_price: originalPrice, price, product_no: productNo } = toRefs(props);

    // 할인여부, 할인율
    const { isDiscount, discountPercent } = getDiscount(originalPrice.value, price.value);

    // 현재 가격
    const { result: currentPrice } = getLocaleNumber(price.value);

    // 상세페이지 링크
    const router = useRouter();
    const goItemDetail = () => {
      router.push({
        name: 'ItemDetail',
        params: {
          id: productNo.value,
        },
      });
    };

    return {
      isDiscount,
      discountPercent,
      currentPrice,
      goItemDetail,
    };
  },
};
</script>

<style scoped></style>
