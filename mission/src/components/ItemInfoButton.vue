<template>
  <div id="ItemInfoButton" data-test="ItemInfoButton" class="">
    <div class="btn_frame">
      <span v-if="!data" class="txt size_14 weight_b color_white"
        >상품 정보를 불러오지 못해 지금은 구매할 수 없습니다.
        <br />
        새로고침을 하거나 고객센터에 문의해주세요.
      </span>

      <div v-if="data" class="flex row align_center lay_1">
        <button type="button" :disabled="!data || !isPossibleOrder" @click="handleBtnLike">
          <ion-icon
            :name="isLikeProduct ? 'heart' : 'heart-empty'"
            class="btn_like"
            :class="isLikeProduct ? 'act' : ''"
          ></ion-icon>
        </button>
        <div class="line verti"></div>
        <button type="button" class="lay_1" :disabled="!data || !isPossibleOrder">
          <p class="txt size_14 weight_b color_white lay_1">
            {{ isPossibleOrder ? `${data}원 구매하기` : `${whyOrderNotPossible}` }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemInfoButton',
  data() {
    return {
      id: this.$store.getters.getProduct.id,
      // 상품 현재 각격
      data: this.$store.getters.getProductCurrentPrice,
      // 상품 구매 가능 여부 확인
      isPossibleOrder: this.$store.getters.getProduct.isPossibleOrder,
      // 상품 구매 불가능 사유
      whyOrderNotPossible: this.$store.getters.getProduct.whyOrderNotPossible,

      // 찜버튼
      isLikeProduct: this.$store.state.loggedUser.data[0].likeProduct,
    };
  },
  methods: {
    handleBtnLike() {
      this.$store.commit('changeUserLike', this.id);
    },
  },
};
</script>

<style scoped>
#ItemInfoButton {
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
}
#ItemInfoButton .btn_frame {
  width: 100%;
  height: auto;
  padding: 0;
  background-color: #444;
}
#ItemInfoButton button {
  padding: var(--px_20);
}
.btn_like {
  color: #fff;
  font-size: 16px;
  font-size: 1.34rem;
  transition: 0.3s;
}
.btn_like.act {
  color: #ff5f5f;
}
</style>
