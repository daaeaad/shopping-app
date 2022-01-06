import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

// Home.vue
describe('Home.vue', () => {
  const wrapper = mount(Home);

  // text 데이터 검사 - 성공
  test('text가 빈값이면 isText는 false 입니다.', () => {
    wrapper.vm.text = '';
    expect(wrapper.vm.checkText()).toBeFalsy();
  });

  // text 데이터 검사 - 실패
  test('text가 빈값이면 isText는 true가 아닙니다.', () => {
    wrapper.vm.text = '';
    expect(wrapper.vm.checkText()).toBeTruthy();
  });

  // text 데이터 업데이트 - 성공
  test('text에 값이 있으면 text 데이터를 업데이트 합니다.', () => {
    wrapper.vm.updateText('hello');
    expect(wrapper.vm.text).toBe('hello');
  });

  // text 데이터 업데이트 - 실패
  test('text에 값이 없으면 text 데이터를 업데이트 하지 않습니다.', () => {
    wrapper.vm.updateText('');
    expect(wrapper.vm.text).toBe('hello');
  });

  // text 순서 회전 - 성공
  test('shakeText 함수가 실행되면 text의 순서는 1칸씩 회전합니다.', () => {
    wrapper.vm.text = '123';
    wrapper.vm.shakeText();
    expect(wrapper.vm.text).toBe('231');
  });

  // text 순서 회전 - 실패
  test('shakeText 함수가 실행되면 text의 순서는 2칸씩 회전하지 않습니다.', () => {
    wrapper.vm.text = '12345';
    wrapper.vm.shakeText();
    expect(wrapper.vm.text).toBe('34521');
  });

  // 클릭 카운터 업데이트 - 성공
  test('클릭 횟수는 데이터가 유효할때만 증가합니다.', () => {
    wrapper.vm.text = 'hello'; // true
    wrapper.vm.countClick(1);
    expect(wrapper.vm.clickCnt).toBe(1);
  });

  // 클릭 카운터 업데이트 - 실패
  test('클릭 횟수는 데이터가 유효하지 않으면 증가하지 않습니다.', () => {
    wrapper.vm.text = ''; // false
    wrapper.vm.clickCnt = 3;
    wrapper.vm.countClick(4);
    expect(wrapper.vm.clickCnt).toBe(4);
  });
});
