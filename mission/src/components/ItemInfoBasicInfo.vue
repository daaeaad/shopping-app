<template>
  <div id="ItemInfoBasicInfo" data-test="ItemInfoBasicInfo" class="padding_rl_15">
    <div class="blank_box_15"></div>

    <div v-if="!data">
      <p class="lay_1 txt size_12 align_center padding_20 color_9b">
        가격 정보를 불러올 수 없습니다.
      </p>
    </div>
    <div v-if="data">
      <p data-test="pname" class="txt size_14 align_left weight_b">{{ data.name }}</p>
      <div class="blank_box_15"></div>
      <div class="lay_1 align_left" data-test="price">
        <div v-if="!data.isPossibleOrder">
          <div class="ment_box">
            <p class="lay_1 txt size_12 align_center padding_20">
              {{ data.whyOrderNotPossible }}
            </p>
          </div>
        </div>
        <div v-if="data.isPossibleOrder">
          <p
            class="txt size_12 color_aa txt_line_through"
            v-if="data.isDiscount"
            data-test="discountPrice"
          >
            {{ data.price }}
          </p>
          <div class="flex row">
            <p
              data-test="discountPrice"
              class="txt size_16 color_red weight_b"
              v-if="data.isDiscount"
            >
              {{ data.discoutPercent }}%
            </p>
            <p class="txt size_12">
              <b class="size_16 weight_b">{{ currentPrice }}</b
              >원
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="blank_box_15"></div>
  </div>
</template>

<script>
export default {
  name: 'ItemInfoBasicInfo',
  data() {
    return {
      data: this.$store.getters.getProduct,
      currentPrice: this.$store.getters.getProductCurrentPrice,
    };
  },
  method: {},
};
</script>

<style></style>
