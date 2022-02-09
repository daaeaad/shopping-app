<template>
  <footer id="footer" data-test="footer">
    <template v-if="nav">
      <Nav />
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
</style>
