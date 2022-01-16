<template>
  <!-- 상품 상세 설명 영역 { -->
  <div id="ItemInfoDetailInfo" data-test="ItemInfoDetailInfo" class="padding_rl_15 align_left">
    <div class="blank_box_15"></div>

    <!-- 제목 -->
    <p class="txt size_14 weight_b">상품 설명</p>
    <div class="blank_box_15"></div>

    <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
    <div v-if="!data">
      <p class="lay_1 txt size_12 align_center padding_20 color_9b">
        상품 설명을 불러올 수 없습니다.
      </p>
    </div>
    <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

    <!-- 데이터를 정상적으로 불러온 경우 { -->
    <div v-if="data">
      <!-- 상세 설명 (html형식) -->
      <div class="" data-test="description" v-html="data.description"></div>
    </div>
    <!-- } 데이터를 정상적으로 불러온 경우 -->

    <div class="blank_box_15"></div>
  </div>
  <!-- } 상품 상세 설명 영역 -->
</template>

<script>
export default {
  name: 'ItemInfoDetailInfo',
  data() {
    return {
      data: this.$store.getters.getProduct,
    };
  },
  method: {},
};
</script>

<style></style>
