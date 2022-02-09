<template>
  <!-- 헤더 { -->
  <transition name="slide">
    <Header data-test="header" v-show="!isScrollDown" :class="{ slideUp: isScrollDown }" />
  </transition>
  <!-- } 헤더 끝 -->

  <!-- 목록 -->
  <div
    id="item-list-page"
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
        <template v-if="!products.length">
          <div class="position_absolute center lay_1">
            <p class="txt size_14 color_98 line_height_15">목록이 존재하지 않습니다.</p>
          </div>
        </template>
        <!-- 반복 { -->
        <li class="lay_2_1" v-for="product in products" :key="product.id">
          <ItemListItem
            :product_no="product.product_no"
            :image="product.image"
            :name="product.name"
            :original_price="product.original_price"
            :price="product.price"
            :description="product.description"
            :isLike="isLike(wish, product.product_no)"
          />
        </li>
        <!-- } 반복 -->
      </ul>
    </div>
    <!-- } 데이터를 정상적으로 불러왔을 때 -->
  </div>
  <!-- } 목록 -->

  <!-- Nav(풋터) { -->
  <Footer :nav="true" />
  <!-- } Nav(풋터) 끝 -->
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';

// composable
import getHeaderHeight from '@/composable/getHeaderHeight';
import getFooterHeight from '@/composable/getFooterHeight';
import getScrollInfo from '@/composable/getScrollInfo';
import { isLike } from '@/composable/handleWish';

// component
import ItemListItem from '@/components/ItemList/ItemListItem.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

// repository
import Repository from '@/repositories/RepositoryFactory';

// repository - item
const ItemRepository = Repository.get('item');
// repository - wish
const WishRepository = Repository.get('wish');

export default {
  name: 'ItemListPage',
  components: { Header, Footer, ItemListItem },

  setup() {
    // data
    const state = reactive({
      products: [],
      wish: [],
    });

    const route = useRoute();

    // state에 data 할당
    (async () => {
      try {
        // 전체 상품 목록
        const repoDataList = await ItemRepository.getList();
        // 찜한 상품 목록
        const repoDataWish = await WishRepository.getList();

        state.wish = repoDataWish;

        // route path에 따라 데이터 바꾸기
        const toggleListData = () => {
          if (route.path === '/wish') {
            // wish list page면 찜 목록
            state.products = repoDataWish;
          } else {
            // home page면 전체 목록
            state.products = repoDataList;
          }
        };
        // 컴포넌트 생성시 바로 실행
        toggleListData();

        // route path 변경 감지해서 데이터 바꾸기
        watch(
          () => route.path,
          () => {
            toggleListData();
          },
        );
      } catch (err) {
        console.log(err);
      }
    })();

    // 스크롤 위치
    const { scrollPosition, isScrollDown } = getScrollInfo();
    // header 높이
    const { headerHeight } = getHeaderHeight();
    // footer 높이
    const { footerHeight } = getFooterHeight();

    // data
    return {
      scrollPosition,
      isScrollDown,
      headerHeight,
      footerHeight,
      isLike,
      ...toRefs(state),
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
