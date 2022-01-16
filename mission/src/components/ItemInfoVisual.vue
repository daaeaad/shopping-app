<template>
  <div id="itemInfoVisual" data-test="itemInfoVisual">
    <div class="img_box square">
      <div class="inner">
        <div v-if="!data" class="img_frame flex row align_center">
          <p class="lay_1 txt size_12 align_center padding_20 color_9b">
            이미지를 불러올 수 없습니다.
          </p>
        </div>
        <div v-if="data" class="img_frame">
          <img :src="data.imgMain[0]" alt="" data-test="imgMain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemInfoVisual',
  data() {
    return {
      data: this.$store.getters.getProduct,
    };
  },
  method: {},
};
</script>

<style></style>
