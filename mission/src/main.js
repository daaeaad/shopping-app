import { createApp } from 'vue';
import icons from 'v-svg-icons';
import '@/assets/style/template.css';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).component('icon', icons).use(store).use(router)
  .mount('#app');
