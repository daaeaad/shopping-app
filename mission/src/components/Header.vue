<template>
  <header id="header" class="lay_1 boxshadow">
    <div class="inner lay_1 flex row align_center justify_center position_relative">
      <!-- 좌측 { -->
      <div class="left position_absolute">
        <div class="inner flex row align_center">
          <!-- 버튼: 뒤로가기 -->
          <template v-if="btn === 'back'">
            <button @click="$router.go(-1)">
              <icon name="arrow-left" class="ico heart_line" height="20" color="#666" />
            </button>
          </template>
          <!-- / 버튼: 뒤로가기 -->
        </div>
      </div>
      <!-- } 좌측 끝 -->

      <!-- 헤더 중앙 -->
      <div class="center">
        <h1 class="logo"><img src="@/assets/images/logo/logo.png" alt="" /></h1>
      </div>
      <!-- } 헤더 중앙 끝 -->

      <!-- 우측 { -->
      <div class="right position_absolute">
        <div class="inner flex row align_center">
          <!-- 버튼 -->
        </div>
      </div>
      <!-- } 우측 끝 -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    btn: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
#header {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}
#header.boxshadow {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}
#header > .inner {
  width: 100%;
  height: var(--px_60);
  background-color: #fff;
}
#header .logo {
  padding: var(--px_20);
}
#header .logo img {
  width: var(--px_74);
  height: auto;
}
#header .left {
  left: 0;
  top: 0;
}
#header .right {
  right: 0;
  top: 0;
}
#header .left button,
#header .right button {
  width: var(--px_60);
  height: var(--px_60);
}
</style>
