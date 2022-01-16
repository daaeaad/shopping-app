<template>
  <div id="itemStoreInfo" data-test="itemStoreInfo" class="padding_rl_15">
    <div class="blank_box_15"></div>
    <div v-if="!store">
      <div class="txt_frame">
        <p class="txt size_12 align_center padding_20 color_9b">
          판매자 정보를 불러올 수 없습니다.
          <br />
          고객센터로 문의해주세요.
        </p>
      </div>
    </div>
    <div v-if="store" class="flex row align_center">
      <div class="img_frame circle profile">
        <img :src="store.imgProfile[0]" alt="" data-test="imgProfile" />
      </div>
      <div class="txt_frame align_left">
        <p data-test="companyName" class="txt size_12">{{ store.companyName }}</p>
        <div data-test="tags">
          <a href="#" class="txt size_10" v-for="(tag, index) in store.tags" :key="index"
            >#{{ tag }}</a
          >
        </div>
      </div>
    </div>
    <div class="blank_box_15"></div>
  </div>
</template>

<script>
export default {
  name: 'ItemInfoStoreInfo',
  data() {
    return {
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
