import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';

const getCartInfo = ({ quantity, productNo, totalPrice }) => {
  const store = useStore();

  // 장바구니 전체 상품 목록 가져오기
  const getAllProducts = computed(() => store.getters.getCartItem);

  // 장바구니 전체 상품 총 수량
  const getAllTotalCount = computed(() => store.getters.getTotalCount);

  // 장바구니 전체 상품 총 금액
  const getAllTotalPrice = computed(() => {
    const num = !store.getters.getTotalPrice ? 0 : store.getters.getTotalPrice;

    return num.toLocaleString();
  });

  // 수량
  let quantityNum;
  if (!quantity) {
    quantityNum = ref(0);
  } else {
    quantityNum = ref(quantity);
  }

  // 수량 - 감소
  const incrementQuantity = () => {
    quantityNum.value += 1;
  };

  // 수량 - 증가
  const decrementQuantity = () => {
    quantityNum.value -= 1;
  };

  // 수량 - 변경 감지, store에 업데이트
  watch(quantityNum, (newVal) => {
    if (newVal <= 0) {
      quantityNum.value = 1;
    } else {
      store.dispatch('addCart', { id: productNo, num: newVal });
    }
  });

  // 이 목록의 총 금액
  const getTotalPrice = computed(() => {
    let result;
    if (!totalPrice) {
      result = '가격을 불러오지 못했습니다.';
    } else {
      result = totalPrice.value.toLocaleString();
    }
    return result;
  });

  // 체크
  const checkedItems = ref(store.getters.getCheckedId);
  watch(checkedItems, () => {
    store.dispatch('toggleChecked', { id: productNo });
  });

  // 삭제하기
  const deleteThisItem = () => {
    store.dispatch('deleteCart', { id: productNo });
  };

  return {
    getAllProducts,
    getAllTotalCount,
    getAllTotalPrice,
    quantityNum,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
    checkedItems,
    deleteThisItem,
  };
};

export default getCartInfo;
