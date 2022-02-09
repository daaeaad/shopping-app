<template>
  <!-- 헤더 { -->
  <Header data-test="header" />
  <!-- } 헤더 끝 -->

  <!-- 목록 -->
  <div
    id="not-found-page"
    class="position_absolute lay_1 height_100 flex col justify_center align_center"
  >
    <div class="">
      <p class="txt size_16 color_black line_height_15">
        죄송합니다. <br />
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <div class="blank_box_30"></div>
      <div class="flex row justify_center">
        <button
          type="button"
          class="btn btn_basic btn_green"
          data-test="btnShakeText"
          @click="$router.go(-1)"
        >
          이전 페이지로
        </button>
        <div class="blank_box_15"></div>
        <button
          type="button"
          class="btn btn_basic btn_gray"
          data-test="handleClickBtn"
          @click="$router.push({ name: 'Home' })"
        >
          홈으로
        </button>
      </div>
    </div>
  </div>
  <!-- } 목록 -->

  <!-- Nav(풋터) { -->
  <Footer />
  <!-- } Nav(풋터) 끝 -->
</template>

<script>
// composable
import getHeaderHeight from '@/composable/getHeaderHeight';
import getFooterHeight from '@/composable/getFooterHeight';

// component
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'NotFoundPage',
  components: { Header, Footer },

  setup() {
    // data

    // header 높이
    const { headerHeight } = getHeaderHeight();
    // footer 높이
    const { footerHeight } = getFooterHeight();

    // data
    return {
      headerHeight,
      footerHeight,
    };
  },
};
</script>

<style>
/* 슬라이드 애니메이션 */
.slide-enter {
  /* 초기 상태 */
}

.slide-enter-active {
  animation: slide-in 0.3s ease-out forwards;
}

.slide-leave {
}

.slide-leave-active {
  animation: slide-out 0.5s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-80px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-80px);
  }
}
</style>
