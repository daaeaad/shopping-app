<template>
  <nav id="nav" data-test="nav">
    <ul class="flex row align_item justify_center">
      <!-- 메뉴 버튼1: 홈 -->
      <router-link data-test="menu" :to="{ name: 'Home' }" class="menu" active-class="act" tag="li">
        <div data-test="home" class="menu_inner flex col justify_center align_center">
          <div class="ico_frame">
            <icon name="home" class="ico" data-test="icon" />
          </div>
          <div class="txt_frame">
            <p class="txt size_10" data-test="txt">Home</p>
          </div>
        </div>
      </router-link>
      <!-- } 메뉴 버튼1: 홈 끝 -->

      <!-- 메뉴 버튼2: 찜 목록 -->
      <router-link
        data-test="menu"
        :to="{ name: 'WishList' }"
        class="menu"
        active-class="act"
        tag="li"
      >
        <div data-test="wish" class="menu_inner flex col justify_center align_center">
          <div class="ico_frame">
            <icon name="heart" class="ico" data-test="icon" />
          </div>
          <div class="txt_frame">
            <p class="txt size_10" data-test="txt">Like</p>
          </div>
        </div>
      </router-link>
      <!-- } 메뉴 버튼2: 찜 목록 끝 -->

      <!-- 메뉴 버튼3: 장바구니 -->
      <router-link data-test="menu" :to="{ name: 'Cart' }" class="menu" active-class="act" tag="li">
        <div data-test="cart" class="menu_inner flex col justify_center align_center">
          <div class="ico_frame">
            <icon name="shopping-bag" class="ico" data-test="icon" />
          </div>
          <div class="txt_frame">
            <p class="txt size_10" data-test="txt">Cart</p>
          </div>
        </div>
      </router-link>
      <!-- } 메뉴 버튼3: 장바구니 끝 -->

      <!-- 메뉴 버튼4: 마이페이지 -->
      <router-link
        data-test="menu"
        :to="{ name: 'MyInfo' }"
        class="menu"
        active-class="act"
        tag="li"
      >
        <div data-test="my" class="menu_inner flex col justify_center align_center">
          <div class="ico_frame">
            <icon name="profile" class="ico" data-test="icon" />
          </div>
          <div class="txt_frame">
            <p class="txt size_10" data-test="txt">My</p>
          </div>
        </div>
      </router-link>
      <!-- } 메뉴 버튼4: 마이페이지 끝 -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style scoped>
#footer {
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
}
#nav {
  width: 100%;
  height: auto;
  border-radius: var(--px_15) var(--px_15) 0 0;
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
#nav .menu .menu_inner {
  padding: var(--px_20);
  padding-bottom: 0;
}
#nav .menu .ico_frame {
  width: var(--px_22);
  height: var(--px_22);
}
#nav .menu .ico_frame .ico {
  color: #bbb;
  width: 100%;
  height: auto;
}
#nav .menu .txt {
  color: #888;
}

#nav .menu.act .ico_frame .ico {
  color: #222;
}
#nav .menu.act .txt {
  color: #222;
  font-weight: 700;
}
</style>
