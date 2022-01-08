import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import TextView from '@/components/TextView.vue';

describe('TextView.vue - function', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TextView);
  });

  test('성공 :: handleShakeText 함수를 실행하면 부모 컴포넌트로부터 받은 shakeText 함수를 실행하고 한칸씩 회전합니다.', () => {
    const home = mount(Home);
    home.vm.text = '123';
    wrapper.vm.handleShakeText();
    home.vm.shakeText();
    expect(home.vm.text).toBe('231');
  });

  test('실패 :: handleShakeText 함수를 실행하면 부모 컴포넌트로부터 받은 shakeText 함수에 실행을 요청하고, shakText는 text가 빈값이면 실행하지 않습니다.', () => {
    const home = mount(Home);
    home.vm.text = '';
    wrapper.vm.handleShakeText();
    home.vm.shakeText();
    expect(home.vm.text).toBe('231');
  });
});

describe('TextView.vue - trigger event', () => {
  let wrapper;
  let spyFn = {};
  beforeEach(() => {
    spyFn.handleShakeText = jest.spyOn(TextView.methods, 'handleShakeText');
    spyFn.handleClickBtn = jest.spyOn(TextView.methods, 'handleClickBtn');
    wrapper = mount('TextView');
    wrapper.vm.text('ABCD');
  });

  test('성공 :: 글자 섞기 버튼을 클릭하면 handleShakeText 함수가 실행됩니다. ', () => {
    const btn = wrapper.get('[data-test="btnShakeText"]');
    btn.trigger('click');
    expect(spyFn.handleShakeText).toHaveBeenCalled();
  });

  test('성공 :: 알림 버튼을 클릭하면 handleClickBtn 함수가 실행됩니다.', () => {
    const btn = wrapper.get('[data-test="handleClickBtn"]');
    btn.trigger('click');
    expect(spyFn.handleClickBtn).toHaveBeenCalled();
  });
});