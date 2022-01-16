<template>
  <!-- 상품 대표 사진 영역 { -->
  <div id="itemInfoVisual" data-test="itemInfoVisual">
    <div class="img_box square">
      <div class="inner">
        <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
        <div v-if="!data" class="img_frame flex row align_center">
          <p class="lay_1 txt size_12 align_center padding_20 color_9b">
            이미지를 불러올 수 없습니다.
          </p>
        </div>
        <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

        <!-- 데이터를 정상적으로 불러온 경우 { -->
        <div v-if="data" class="img_frame">
          <!-- 이미지 -->
          <img :src="data.imgMain[0]" alt="" data-test="imgMain" />
        </div>
      </div>
      <!-- } 데이터를 정상적으로 불러온 경우 -->
    </div>
  </div>
  <!-- } 상품 대표 사진 영역 -->
</template>

<script>
export default {
  name: 'ItemInfoVisual',
  data() {
    return {
      // 상품 정보
      data: this.$store.getters.getProduct,
    };
  },
  method: {},
};
</script>

<style></style>
