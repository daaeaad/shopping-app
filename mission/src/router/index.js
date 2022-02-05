import { createRouter, createWebHistory } from 'vue-router';
import NotFoundPage from '@/views/NotFound.vue';
import ItemListPage from '@/views/ItemList.vue';
import ItemInfo from '@/views/ItemInfo.vue';
import CartList from '@/views/CartList.vue';
import MyInfo from '@/views/MyInfo.vue';

const routes = [
  // redirect to 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  // 404
  {
    path: '/404',
    name: '404',
    component: NotFoundPage,
  },

  // 홈: 전체 상품 목록
  {
    path: '/',
    name: 'Home',
    component: ItemListPage,
  },

  // 아직 사용 안함
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },

  // 상품 상세 페이지
  {
    path: '/item/:id',
    name: 'ItemDetail',
    component: ItemInfo,
  },

  // 위시리스트 (찜 목록) 페이지
  {
    path: '/wish',
    name: 'WishList',
    component: ItemListPage,
  },

  // 장바구니
  {
    path: '/cart',
    name: 'Cart',
    component: CartList,
  },

  // 마이페이지
  {
    path: '/info',
    name: 'MyInfo',
    component: MyInfo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
