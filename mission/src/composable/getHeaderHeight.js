import { onMounted, nextTick, ref } from 'vue';

/* 헤더 높이 확인하기 { */
const getHeaderHeight = () => {
  // 헤더 높이
  const headerHeight = ref(0);

  // 헤더 높이: 값 할당
  const updateHeaderHeight = () => {
    headerHeight.value = document.querySelector('#header').offsetHeight;
  };

  // 렌더링이 다 되고 나면,
  onMounted(async () => {
    // #header의 높이 업데이트
    try {
      await nextTick(() => {
        updateHeaderHeight();
      });
    } catch (err) {
      console.log(err);
    }
  });

  return {
    headerHeight,
  };
};
/* } 헤더 높이 확인하기 끝 */

export default getHeaderHeight;
