import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

// Home.vue
describe('Home.vue', () => {
  const wrapper = mount(Home);

  // text 데이터 검사 - 성공
  test('성공:: text가 빈값이면 isText는 false 입니다.', () => {
    wrapper.vm.text = '';
    expect(wrapper.vm.checkText()).toBeFalsy();
  });

  // text 데이터 업데이트 - 성공
  test('성공:: text에 값이 있으면 text 데이터를 업데이트 합니다.', () => {
    wrapper.vm.updateText('hello');
    expect(wrapper.vm.text).toBe('hello');
  });

  // text 순서 회전 - 성공
  test('성공:: shakeText 함수가 실행되면 text의 순서는 1칸씩 회전합니다.', () => {
    wrapper.vm.text = '123';
    wrapper.vm.shakeText();
    expect(wrapper.vm.text).toBe('231');
  });

  // 클릭 카운터 업데이트 - 성공
  test('성공:: 클릭 횟수는 데이터가 유효할때만 증가합니다.', () => {
    wrapper.vm.text = 'hello'; // true
    wrapper.vm.countClick(1);
    expect(wrapper.vm.clickCnt).toBe(1);
  });
});
