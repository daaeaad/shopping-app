import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import TextView from '@/components/TextView.vue';

describe('TextView.vue', () => {
  const home = mount(Home);
  const wrapper = mount(TextView);

  beforeEach(() => {
    home.vm.text = '123';
  });

  test('handleShakeText 함수를 실행하면 부모 컴포넌트로부터 받은 shakeText 함수의 실행을 요청합니다.', () => {
    wrapper.vm.handleShakeText();
    home.vm.shakeText();
    expect(home.vm.text).toBe('231');
  });

  test('handleShakeText 함수를 실행하면 부모 컴포넌트로부터 받은 shakeText 함수에 실행을 요청하고, shakText는 text가 빈값이면 실행하지 않습니다.', () => {
    home.vm.text = '';
    wrapper.vm.handleShakeText();
    home.vm.shakeText();
    expect(home.vm.text).toBe('231');
  });
});