import {
  onMounted, onBeforeUnmount, nextTick, ref,
} from 'vue';

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
    // 윈도우 로드가 되고 #header의 높이 업데이트
    await nextTick(() => {
      window.addEventListener('load', updateHeaderHeight);
    });
  });

  onBeforeUnmount(() => {
    // 윈도우 로드가 되고 #header의 높이 업데이트
    window.removeEventListener('load', updateHeaderHeight);
  });

  return {
    headerHeight,
  };
};
/* } 헤더 높이 확인하기 끝 */

export default getHeaderHeight;
