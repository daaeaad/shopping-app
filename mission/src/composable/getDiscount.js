import { computed } from 'vue';

/* 할인율 계산 { */
const getDiscount = (originalPrice, currentPrice) => {
  // 할인 여부 확인하기
  const isDiscount = computed(() => originalPrice !== currentPrice);

  // 할인율 계산
  const discountPercent = computed(() => {
    // 할인중이 아니면 0을 반환
    if (!isDiscount.value) {
      return 0;
    }

    const num = (originalPrice - currentPrice) / originalPrice;

    // 계산된 할인율은 소수점 1자리에서 내림한다.
    const result = Math.floor(num * 100);

    return result;
  });

  // 할인여부, 할인율 반환
  return { isDiscount, discountPercent };
};
/* } 할인율 계산 끝 */

export default getDiscount;
