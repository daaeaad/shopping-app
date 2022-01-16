<template>
  <!-- 리뷰 { -->
  <div id="ItemInfoReview" data-test="ItemInfoReview" class="padding_rl_15 align_left">
    <div class="blank_box_15"></div>

    <!-- 제목 -->
    <p class="txt size_14 weight_b">
      <!-- 리뷰 개수 -->
      리뷰({{ review.length }})
    </p>
    <!-- / 제목 -->

    <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
    <div v-if="!review">
      <div class="txt_frame">
        <p class="txt size_12 align_center padding_20 color_9b">
          리뷰를 불러올 수 없습니다.<br />새로고침을 하거나 고객센터에 문의해주세요.
        </p>
      </div>
    </div>
    <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

    <!-- 데이터를 정상적으로 불러온 경우 { -->
    <ul v-if="review">
      <!-- 작성된 리뷰가 없을 경우 { -->
      <div v-if="!review.length">
        <div class="txt_frame">
          <p class="txt size_12 align_center padding_20 color_9b">아직 작성된 리뷰가 없습니다.</p>
        </div>
      </div>
      <!-- } 작성된 리뷰가 없을 경우 -->

      <!-- 작성된 리뷰가 있을 경우 { -->
      <!-- 반복될 내용 { -->
      <li v-for="(item, index) in review" :key="index">
        <div class="blank_box_15"></div>

        <!-- 상단 -->
        <div class="flex row justify_space_between">
          <!-- 작성자 -->
          <p class="txt size_12 color_9b weight_m">
            {{ item.ownerName }}
          </p>
          <!-- 작성일 || (수정된 게시물일 경우)수정일 -->
          <p class="txt size_12 color_9b weight_m">
            {{ item.modifiedAt ? `${item.modifiedAt} 에 수정됨` : item.createdAt }}
          </p>
        </div>
        <!-- / 상단 -->

        <div class="blank_box_10"></div>

        <!-- 구매한 옵션 정보 -->
        <p class="txt size_12 weight_b color_9b">
          {{ item.optionInfo }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 본문 -->
        <div class="flex row justify_space_between">
          <!-- 본문 텍스트 내용 -->
          <p class="txt size_12 line_height_15">
            {{ item.content }}
          </p>

          <!-- 리뷰 이미지 -->
          <div class="img_box square" v-if="item.img.length">
            <div class="inner">
              <div class="img_frame">
                <!-- 이미지 -->
                <img :src="item.img" alt="" data-test="imgMain" />
              </div>
            </div>
          </div>
          <!-- / 리뷰 이미지 -->
        </div>
        <!-- / 본문 -->
        <div class="blank_box_15"></div>
        <div class="line hori"></div>
      </li>
      <!-- } 반복될 내용 -->
      <!-- } 작성된 리뷰가 있을 경우 -->
    </ul>
    <!-- } 데이터를 정상적으로 불러온 경우 -->

    <div class="blank_box_15"></div>
  </div>
  <!-- } 리뷰 끝 -->
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
