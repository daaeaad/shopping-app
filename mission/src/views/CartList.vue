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
    data-test="cartListPage"
    id="cart-list-page"
    class="padding_bottom_100"
    :style="{ paddingTop: `${headerHeight}px`, paddingBottom: `${footerHeight}px` }"
  >
    <!-- 데이터를 불러오지 못했을 때 { -->
    <div v-if="!products" class="flex align_center justify_center">
      <div class="position_absolute center">
        <p class="txt size_14 color_98 line_height_15">
          목록을 불러오지 못했습니다.
          <br />
          새로고침을 하거나 고객센터에 문의해주세요.
        </p>
      </div>
    </div>
    <!-- } 데이터를 불러오지 못했을 때 -->

    <!-- 데이터를 정상적으로 불러왔을 때 { -->
    <div v-if="products">
      <ul class="lay_1 flex row wrap">
        <!-- 상품이 없을 경우 { -->
        <template v-if="!products.length">
          <div class="position_absolute center lay_1">
            <p class="txt size_14 color_98 line_height_15">장바구니가 비어 있습니다.</p>
          </div>
        </template>
        <!-- } 상품이 없을 경우 -->

        <template v-else>
          <!-- 반복 { -->
          <li
            data-test="cartListItem"
            class="lay_1"
            v-for="product in products"
            :key="product.product_no"
          >
            <ItemListItem
              :isCartList="true"
              :product_no="product.product_no"
              :image="product.image"
              :name="product.name"
              :original_price="product.original_price"
              :price="product.price"
              :description="product.description"
              :quantity="product.quantity"
              :totalPrice="product.total_price"
            />
          </li>
          <!-- } 반복 -->

          <!-- 상품 총 정보 { -->
          <div class="lay_1">
            <ul data-test="totalInfo" class="lay_1 padding_20 padding_rl_15">
              <li class="lay_1 flex row align_center justify_space_between">
                <div class="left">
                  <p class="txt size_12 color_98">주문 상품 수</p>
                </div>
                <div class="right">
                  <p class="txt size_14 weight_m">
                    총
                    <b data-test="totalCount" class="txt size_18 weight_b">{{ totalCount }}</b> 개
                  </p>
                </div>
              </li>

              <div class="blank_box_10"></div>

              <li class="lay_1 flex row align_center justify_space_between">
                <div class="left">
                  <p class="txt size_12 color_98">총 주문 금액</p>
                </div>
                <div class="right">
                  <p class="txt size_14 weight_m">
                    <b data-test="totalPrice" class="txt size_18 weight_b">{{ totalPrice }}</b> 원
                  </p>
                </div>
              </li>

              <div class="blank_box_10"></div>

              <li class="lay_1 flex row align_center justify_space_between">
                <div class="left">
                  <p class="txt size_12 color_98">총 결제 금액</p>
                </div>
                <div class="right">
                  <p class="txt size_14 weight_m color_red">
                    <b class="txt size_18 weight_b color_red">{{ totalPrice }}</b> 원
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- } 상품 총 정보 끝 -->
        </template>
      </ul>
    </div>
    <!-- } 데이터를 정상적으로 불러왔을 때 -->
  </div>
  <!-- } 목록 -->

  <!-- Nav(풋터) { -->
  <Footer
    v-if="products && products.length"
    data-test="footer"
    :btn="true"
    :orderBtn="true"
    btnContent="선택 상품 구매하기"
    @goOrder="goOrder()"
  />
  <!-- } Nav(풋터) 끝 -->
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// component
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ItemListItem from '@/components/ItemList/ItemListItem.vue';

// composable
import getHeaderHeight from '@/composable/getHeaderHeight';
import getFooterHeight from '@/composable/getFooterHeight';
import getScrollInfo from '@/composable/getScrollInfo';
import getCartInfo from '@/composable/getCartInfo';

export default {
  name: 'CartList',
  components: {
    Header,
    Footer,
    ItemListItem,
  },
  setup() {
    // 스크롤 위치
    const { scrollPosition, isScrollDown } = getScrollInfo();
    // header 높이
    const { headerHeight } = getHeaderHeight();
    // footer 높이
    const { footerHeight } = getFooterHeight();

    const {
      getAllProducts: products,
      getAllTotalCount: totalCount,
      getAllTotalPrice: totalPrice,
    } = getCartInfo({});

    // 주문하기 페이지로 이동
    const store = useStore();
    const router = useRouter();
    const goOrder = () => {
      const product = store.getters['cartModule/getCheckedCartItem'];

      store.dispatch('orderModule/handleOrderList', { product });

      router.push({
        name: 'Order',
      });
    };

    return {
      scrollPosition,
      isScrollDown,
      headerHeight,
      footerHeight,
      products,
      totalCount,
      totalPrice,
      goOrder,
    };
  },
};
</script>

<style scoped></style>
