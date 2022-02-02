<template>
  <div class="item-list-item">
    <div class="img_box ratio ratio_10_7 position_relative">
      <div class="inner">
        <a href="#" class="img_frame dis_block overflow_hidden">
          <!-- 상품 이미지 -->
          <img data-test="img" :src="imgMain" alt="" class="" />
        </a>
      </div>

      <!-- 찜 버튼 { -->
      <div class="btn_frame">
        <!-- 버튼
         - 아이콘 스타일 활성화: .btn_like에 .act 클래스 추가 -->

        <button type="button" class="btn_like position_relative">
          <!-- :class="{ act: isLike }" -->
          <icon name="heart" class="ico heart_line" />
          <icon name="heart-fill" class="ico heart_fill" />
        </button>
      </div>
      <!-- } 찜 버튼 -->
    </div>

    <div class="txt_box align_left padding_10 padding_rl_15">
      <a href="#" class="dis_block lay_1">
        <!-- 판매자 상호명 -->
        <p data-test="companyName" class="txt size_12 weight_m">
          {{ companyName }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 상품명 -->
        <p data-test="pname" class="txt size_12 weight_m line_height_13 color_66">
          {{ name }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 가격 -->
        <p data-test="price" class="txt size_14 weight_b">
          <!-- 할인율: 할인중일때만 표시 -->
          <span data-test="discountPercent" v-if="isDiscount" class="color_red">
            {{ discountPercent }}%
          </span>
          {{ currentPrice }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 총 찜 횟수 -->
        <p data-test="totalLike" class="txt size_10 weight_m color_98">
          <icon name="heart-fill" class="ico" size="8" />
          {{ getLocaleTotalLike }}
        </p>

        <div class="blank_box_10"></div>
      </a>
    </div>
  </div>
</template>

<script>
import { toRefs, ref, computed } from 'vue';
import getDiscount from '@/composable/getDiscount';
import getLocaleNumber from '@/composable/getLocaleNumber';

/*
const btnLike = (likeProduct, id) => {
  const isLike = ref(false);

  const getIsLike = () => {
    const arr = Object.values(likeProduct.value);
    let result = arr.filter((item) => item === id);

    result = !!result.length;
    return result;
  };

  isLike.value = getIsLike();

  return { isLike };
};
*/

export default {
  name: 'ItemListItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
    likeProduct: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    // props
    const {
      product,
      // likeProduct
    } = toRefs(props);

    // const { isLike } = btnLike(likeProduct, product.value.id);

    // 상품 이미지
    const imgMain = ref(product.value.imgMain);

    // 상호명
    const companyName = ref(product.value.store.companyName);

    // 상품명
    const name = ref(product.value.name);

    // 총 찜 횟수
    const getLocaleTotalLike = computed(() => product.value.totalLike.toLocaleString());

    // 할인여부, 할인율
    const { isDiscount, discountPercent } = getDiscount(
      product.value.originalPrice,
      product.value.currentPrice,
    );

    // 가격
    const { result: currentPrice } = getLocaleNumber(product.value.currentPrice);

    return {
      imgMain,
      companyName,
      name,
      isDiscount,
      discountPercent,
      currentPrice,
      getLocaleTotalLike,
      // isLike,
    };
  },
};
</script>

<style scoped></style>
