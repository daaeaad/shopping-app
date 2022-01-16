<template>
  <!-- 상품 기본 정보 영역 { -->
  <div id="ItemInfoBasicInfo" data-test="ItemInfoBasicInfo" class="padding_rl_15">
    <div class="blank_box_15"></div>

    <!-- 데이터를 정상적으로 불러오지 못할 경우 { -->
    <div v-if="!data">
      <p class="lay_1 txt size_12 align_center padding_20 color_9b">
        가격 정보를 불러올 수 없습니다.
      </p>
    </div>
    <!-- } 데이터를 정상적으로 불러오지 못할 경우 -->

    <!-- 데이터를 정상적으로 불러온 경우 { -->
    <div v-if="data">
      <!-- 상품명 -->
      <p data-test="pname" class="txt size_14 align_left weight_b">
        {{ data.name }}
      </p>

      <div class="blank_box_15"></div>

      <div class="lay_1 align_left" data-test="price">
        <!-- 주문 불가능한 상태일 경우 { -->
        <div v-if="!data.isPossibleOrder">
          <div class="ment_box">
            <p class="lay_1 txt size_12 align_center padding_20">
              <!-- 주문 불가능한 사유 -->
              {{ data.whyOrderNotPossible }}
            </p>
          </div>
        </div>
        <!-- } 주문 불가능한 상태일 경우 -->

        <!-- 주문 가능한 상태일 경우 { -->
        <div v-if="data.isPossibleOrder">
          <!-- 할인 중이면 원래 가격을 표시 -->
          <p
            v-if="data.isDiscount"
            data-test="discountPrice"
            class="txt size_12 color_aa txt_line_through"
          >
            {{ data.price }}
          </p>

          <div class="flex row">
            <!-- 할인 중이면 할인율 표시 -->
            <p
              v-if="data.isDiscount"
              data-test="discountPrice"
              class="txt size_16 color_red weight_b"
            >
              {{ data.discoutPercent }}%
            </p>
            <p class="txt size_12">
              <!-- 상품 현재 가격
              할인 중이면 할인된 가격,
              할인 중이 아니면 원래 가격 표시 -->
              <b class="size_16 weight_b">
                {{ currentPrice }}
              </b>
              원
            </p>
          </div>
        </div>
        <!-- } 주문 가능한 상태일 경우 -->
      </div>
    </div>
    <!-- } 데이터를 정상적으로 불러온 경우 -->

    <div class="blank_box_15"></div>
  </div>
  <!-- } 상품 기본 정보 영역 -->
</template>

<script>
export default {
  name: 'ItemInfoBasicInfo',
  data() {
    return {
      // 상품 정보
      data: this.$store.getters.getProduct,
      // 상품 현재 가격
      currentPrice: this.$store.getters.getProductCurrentPrice,
    };
  },
  method: {},
};
</script>

<style></style>
