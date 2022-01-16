<template>
  <!-- 판매자 정보 영역 { -->
  <div id="itemStoreInfo" data-test="itemStoreInfo" class="padding_rl_15">
    <div class="blank_box_15"></div>

    <!-- 데이터를 정상적으로 불러오지 못할 경우 { -->
    <div v-if="!store">
      <div class="txt_frame">
        <p class="txt size_12 align_center padding_20 color_9b">
          판매자 정보를 불러올 수 없습니다.
          <br />
          고객센터로 문의해주세요.
        </p>
      </div>
    </div>
    <!-- } 데이터를 정상적으로 불러오지 못할 경우 -->

    <!-- 데이터를 정상적으로 불러온 경우 { -->
    <div v-if="store" class="flex row align_center">
      <!-- 클릭시 판매자 프로필로 링크 이동 -->
      <a href="#" class="flex row align_center">
        <!-- 프로필 사진 -->
        <div class="img_frame circle profile">
          <!-- 이미지 -->
          <img :src="store.imgProfile[0]" alt="" data-test="imgProfile" />
        </div>
        <!-- / 프로필 사진 -->

        <div class="txt_frame align_left">
          <p data-test="companyName" class="txt size_12">
            <!-- 상호명 -->
            {{ store.companyName }}
          </p>
          <div data-test="tags">
            <!-- 해시태그 -->
            <span
              data-test="tag_item"
              v-for="(tag, index) in store.tags"
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
</template>

<script>
export default {
  name: 'ItemInfoStoreInfo',
  data() {
    return {
      // 판매자 정보
      store: this.$store.getters.getStore,
    };
  },
  method: {},
};
</script>

<style scoped>
a {
  padding: 0 2px;
}
</style>
