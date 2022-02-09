import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer', () => {
  let wrapper;

  beforeEach(() => {
    const nav = true;
    wrapper = shallowMount(Footer, { props: { nav } });
  });

  it('footer render', () => {
    expect(wrapper.find('[data-test="footer"]').exists()).toBeTruthy();
  });

  it('props의 nav가 false 이면 Nav 컴포넌트는 렌더링 하지 않는다.', async () => {
    await wrapper.setProps({ nav: false });

    expect(wrapper.findComponent({ name: 'Nav' }).exists()).toBeFalsy();
  });

  it('props의 nav가 true 이면 Nav 컴포넌트를 렌더링 한다.', async () => {
    await wrapper.setProps({ nav: true });

    expect(wrapper.findComponent({ name: 'Nav' }).exists()).toBeTruthy();
  });
});
