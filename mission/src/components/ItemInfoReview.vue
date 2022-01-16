<template>
  <div id="ItemInfoReview" data-test="ItemInfoReview" class="padding_rl_15 align_left">
    <div class="blank_box_15"></div>
    <p class="txt size_14 weight_b">리뷰({{ review.length }})</p>

    <div v-if="!review">
      <div class="txt_frame">
        <p class="txt size_12 align_center padding_20 color_9b">아직 작성된 리뷰가 없습니다.</p>
      </div>
    </div>

    <ul v-if="review">
      <li v-for="(item, index) in review" :key="index">
        <div class="blank_box_15"></div>
        <div class="flex row justify_space_between">
          <p class="txt size_12 color_9b weight_m">
            {{ item.ownerName }}
          </p>
          <p class="txt size_12 color_9b weight_m">
            {{ item.modifiedAt ? `${item.modifiedAt} 에 수정됨` : item.createdAt }}
          </p>
        </div>
        <div class="blank_box_10"></div>
        <p class="txt size_12 weight_b color_9b">
          {{ item.optionInfo }}
        </p>
        <div class="blank_box_10"></div>
        <div class="flex row justify_space_between">
          <p class="txt size_12 line_height_15">
            {{ item.content }}
          </p>
          <div v-if="item.img.length">
            <div class="img_box square">
              <div class="inner">
                <div class="img_frame">
                  <img :src="item.img" alt="" data-test="imgMain" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="blank_box_15"></div>
        <div class="line hori"></div>
      </li>
    </ul>

    <div class="blank_box_15"></div>
  </div>
</template>

<script>
export default {
  name: 'ItemInfoReview',
  data() {
    return {
      review: this.$store.getters.getReview,
    };
  },
  methods: {},
};
</script>

<style scoped>
.img_box {
  width: 60px;
  min-width: 60px;
}
</style>
