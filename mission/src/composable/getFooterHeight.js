import { onMounted, nextTick, ref } from 'vue';

/* 풋터 높이 확인하기 { */
const getFooterHeight = () => {
  // 풋터 높이: 선언
  const footerHeight = ref(0);

  // 풋터 높이: 값 할당
  const updateFooterHeight = () => {
    footerHeight.value = document.querySelector('#footer').offsetHeight;
  };

  // 렌더링이 다 되고 나면,
  onMounted(async () => {
    try {
      // #footer 높이 업데이트
      await nextTick(() => {
        updateFooterHeight();
      });
    } catch (err) {
      console.log(err);
    }
  });

  return {
    footerHeight,
  };
};
/* } 풋터 높이 확인하기 끝 */

export default getFooterHeight;
