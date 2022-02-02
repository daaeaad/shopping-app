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
});

describe('TextView.vue - trigger event', () => {
  let wrapper;
  const spyFn = {};
  beforeEach(() => {
    wrapper = mount(TextView, {
      props: {
        text: 'ABCD',
      },
    });
    spyFn.handleShakeText = jest.spyOn(wrapper.vm.methods, 'handleShakeText');
    spyFn.handleClickBtn = jest.spyOn(wrapper.vm.methods, 'handleClickBtn');
  });

  test('성공 :: 글자 섞기 버튼을 클릭하면 handleShakeText 함수가 실행됩니다. ', async () => {
    const btn = await wrapper.get('[data-test="btnShakeText"]');
    btn.trigger('click');
    expect(spyFn.handleShakeText).toHaveBeenCalled();
  });

  test('성공 :: 알림 버튼을 클릭하면 handleClickBtn 함수가 실행됩니다.', async () => {
    const btn = await wrapper.get('[data-test="handleClickBtn"]');
    btn.trigger('click');
    expect(spyFn.handleClickBtn).toHaveBeenCalled();
  });
});
