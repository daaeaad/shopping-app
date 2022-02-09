<template>
  <!-- 헤더 { -->
  <transition name="slide">
    <Header
      data-test="header"
      v-show="!isScrollDown"
      :class="{ slideUp: isScrollDown }"
      title="MY PAGE"
    />
  </transition>
  <!-- } 헤더 끝 -->

  <!-- 본문 -->
  <div
    data-test="myInfo"
    id="MyInfo"
    class="padding_bottom_100"
    :style="{ paddingTop: `${headerHeight}px`, paddingBottom: `${footerHeight}px` }"
  >
    <!-- 데이터를 불러오지 못했을 때 { -->
    <div v-if="!users" class="flex align_center justify_center" data-test="apiError">
      <div class="position_absolute center">
        <p class="txt size_14 color_98 line_height_15">
          정보를 불러오지 못했습니다.
          <br />
          새로고침을 하거나 고객센터에 문의해주세요.
        </p>
      </div>
    </div>
    <!-- } 데이터를 불러오지 못했을 때 -->

    <!-- 데이터를 정상적으로 불러왔을 때 { -->
    <template v-if="users">
      <MyInfoView :id="users.id" :email="users.email" :username="users.username" />
    </template>
    <!-- } 데이터를 정상적으로 불러왔을 때 -->
  </div>
  <!-- } 본문 -->

  <!-- Nav(풋터) { -->
  <Footer :nav="true" />
  <!-- } Nav(풋터) 끝 -->
</template>

<script>
import { reactive, toRefs } from 'vue';

// component
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import MyInfoView from '@/components/MyInfoView.vue';

// composable
import getHeaderHeight from '@/composable/getHeaderHeight';
import getFooterHeight from '@/composable/getFooterHeight';
import getScrollInfo from '@/composable/getScrollInfo';

// api
import Repository from '@/repositories/RepositoryFactory';

const UserRepository = Repository.get('user');

export default {
  name: 'MyInfo',
  components: {
    Header,
    Footer,
    MyInfoView,
  },
  setup() {
    const state = reactive({
      users: [],
    });

    // 스크롤 위치
    const { scrollPosition, isScrollDown } = getScrollInfo();
    // header 높이
    const { headerHeight } = getHeaderHeight();
    // footer 높이
    const { footerHeight } = getFooterHeight();

    // 사용자 정보 api 호출, 할당
    (async () => {
      try {
        const getUserInfo = await UserRepository.getUserInfo();
        state.users = getUserInfo.data;
      } catch (err) {
        console.log(err);
      }
    })();

    return {
      scrollPosition,
      isScrollDown,
      headerHeight,
      footerHeight,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped></style>
