import {
  ref, onMounted, onBeforeUnmount, computed,
} from 'vue';

/* 스크롤 위치 확인하기 { */
const getScrollInfo = () => {
  // 스크롤 위치
  const scrollPosition = ref(0);

  // 스크롤 위치: 값 할당
  const updateScrollPosition = () => {
    scrollPosition.value = window.scrollY;
  };

  // 렌더링이 다 되고 나면,
  onMounted(() => {
    // 스크롤 이벤트마다 스크롤 위치 업데이트
    window.addEventListener('scroll', updateScrollPosition);
  });
  onBeforeUnmount(() => {
    // 스크롤 이벤트마다 스크롤 위치 업데이트
    window.removeEventListener('scroll', updateScrollPosition);
  });

  // 아래로 스크롤이 됐는지
  const isScrollDown = computed(() => {
    // 스크롤 위치가 50 이상이면 true
    if (scrollPosition.value > 50) {
      return true;
    }
    // 스크롤 위치가 50 미만이면 false
    return false;
  });

  return {
    scrollPosition,
    isScrollDown,
  };
};
/* } 스크롤 위치 확인하기 끝 */

export default getScrollInfo;
