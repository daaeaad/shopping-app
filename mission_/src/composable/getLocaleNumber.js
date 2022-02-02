import { computed } from 'vue';

/* 숫자 3자리마다 콤마 찍기 { */
const getLocaleNumber = (num) => {
  // 매개변수로 받은 숫자 3자리마다 콤마 찍어서 반환
  const result = computed(() => num.toLocaleString());

  // return
  return {
    result,
  };
};
/* } 숫자 3자리마다 콤마 찍기 끝 */

export default getLocaleNumber;
