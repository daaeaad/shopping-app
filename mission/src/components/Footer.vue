<template>
  <footer id="footer">
    <nav id="nav">
      <ul class="flex row align_item justify_center">
        <!-- 메뉴 버튼1: 홈 -->
        <li class="menu act">
          <a href="#" class="flex col justify_center align_center">
            <div class="ico_frame">
              <icon name="home" class="ico" />
            </div>
            <div class="txt_frame">
              <p class="txt size_10">Home</p>
            </div>
          </a>
        </li>
        <!-- } 메뉴 버튼1: 홈 끝 -->

        <!-- 메뉴 버튼2: 찜 목록 -->
        <li class="menu">
          <a href="#" class="flex col justify_center align_center">
            <div class="ico_frame">
              <icon name="heart" class="ico" />
            </div>
            <div class="txt_frame">
              <p class="txt size_10">Like</p>
            </div>
          </a>
        </li>
        <!-- } 메뉴 버튼2: 찜 목록 끝 -->

        <!-- 메뉴 버튼3: 장바구니 -->
        <li class="menu">
          <a href="#" class="flex col justify_center align_center">
            <div class="ico_frame">
              <icon name="shopping-bag" class="ico" />
            </div>
            <div class="txt_frame">
              <p class="txt size_10">Cart</p>
            </div>
          </a>
        </li>
        <!-- } 메뉴 버튼3: 장바구니 끝 -->

        <!-- 메뉴 버튼4: 마이페이지 -->
        <li class="menu">
          <a href="#" class="flex col justify_center align_center">
            <div class="ico_frame">
              <icon name="profile" class="ico" />
            </div>
            <div class="txt_frame">
              <p class="txt size_10">My</p>
            </div>
          </a>
        </li>
        <!-- } 메뉴 버튼4: 마이페이지 끝 -->
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
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
#nav .menu a {
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
