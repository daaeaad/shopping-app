import { computed } from 'vue';
import { useStore } from 'vuex';

const getOrderInfo = () => {
  const store = useStore();

  // 주문 상품 목록 가져오기
  const getAllProducts = computed(() => store.getters['orderModule/getOrderItem']);

  // 주문 상품 총 수량
  const getAllTotalCount = computed(() => store.getters['orderModule/getOrderTotalCount']);

  // 주문 상품 총 금액
  const getAllTotalPrice = computed(() => {
    const num = !store.getters['orderModule/getOrderTotalPrice']
      ? 0
      : store.getters['orderModule/getOrderTotalPrice'];
    return num.toLocaleString();
  });

  return {
    getAllProducts,
    getAllTotalCount,
    getAllTotalPrice,
  };
};

export default getOrderInfo;
