<template>
  <div id="ItemInfoDetailInfo" data-test="ItemInfoDetailInfo" class="padding_rl_15 align_left">
    <div class="blank_box_15"></div>
    <p class="txt size_14 weight_b">상품 설명</p>
    <div class="blank_box_15"></div>

    <div v-if="!data">
      <p class="lay_1 txt size_12 align_center padding_20 color_9b">
        상품 설명을 불러올 수 없습니다.
      </p>
    </div>
    <div v-if="data">
      <div class="" data-test="description" v-html="data.description"></div>
    </div>

    <div class="blank_box_15"></div>
  </div>
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
