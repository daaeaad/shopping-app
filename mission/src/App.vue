<template>
  <router-view />
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    store.dispatch('cartModule/setCart');
    store.dispatch('userModule/setUser');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
