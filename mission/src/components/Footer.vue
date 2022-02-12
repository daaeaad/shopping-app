<template>
  <footer id="footer" data-test="footer">
    <template v-if="nav">
      <Nav />
    </template>

    <template v-if="btn">
      <div class="footer_btn">
        <div data-test="" class="flex row align_center lay_1">
          <!-- 버튼: 주문하기 -->
          <button
            v-if="orderBtn"
            type="button"
            data-test="btnPurchase"
            class="lay_1"
            @click="$emit('goOrder')"
          >
            <p class="txt size_14 weight_b color_white lay_1">
              <!-- 텍스트 -->
              {{ btnContent }}
            </p>
          </button>
          <!-- / 버튼: 주문하기 -->

          <!-- 버튼: 결제하기 -->
          <button v-else type="button" data-test="btnPurchase" class="lay_1">
            <p class="txt size_14 weight_b color_white lay_1">
              <!-- 텍스트 -->
              {{ btnContent }}
            </p>
          </button>
          <!-- / 버튼: 결제하기 -->
        </div>
      </div>
    </template>
  </footer>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  name: 'Footer',
  components: { Nav },
  props: {
    nav: {
      type: Boolean,
      default: false,
    },
    btn: {
      type: Boolean,
      default: false,
    },
    orderBtn: {
      type: Boolean,
      default: false,
    },
    btnContent: {
      type: String,
      default: '',
    },
  },
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

.footer_btn {
  background-color: #222;
  min-height: 56px;
  display: flex;
  align-items: center;
}
</style>
