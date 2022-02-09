<template>
  <!-- 헤더 { -->
  <transition name="slide">
    <Header
      data-test="header"
      v-show="!isScrollDown"
      :class="{ slideUp: isScrollDown }"
      btn="back"
    />
  </transition>
  <!-- } 헤더 끝 -->

  <!-- 목록 -->
  <div
    id="item-list-page"
    class="padding_bottom_100"
    :style="{ paddingTop: `${headerHeight}px`, paddingBottom: `${footerHeight}px` }"
  >
    장바구니
  </div>
  <!-- } 목록 -->

  <!-- Nav(풋터) { -->
  <Footer :nav="true" />
  <!-- } Nav(풋터) 끝 -->
</template>

<script>
// component
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

// composable
import getHeaderHeight from '@/composable/getHeaderHeight';
import getFooterHeight from '@/composable/getFooterHeight';
import getScrollInfo from '@/composable/getScrollInfo';

export default {
  name: 'CartList',
  components: {
    Header,
    Footer,
  },
  setup() {
    // 스크롤 위치
    const { scrollPosition, isScrollDown } = getScrollInfo();
    // header 높이
    const { headerHeight } = getHeaderHeight();
    // footer 높이
    const { footerHeight } = getFooterHeight();

    return {
      scrollPosition,
      isScrollDown,
      headerHeight,
      footerHeight,
    };
  },
};
</script>

<style scoped></style>
