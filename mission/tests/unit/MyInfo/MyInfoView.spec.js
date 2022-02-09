import { shallowMount } from '@vue/test-utils';
import MyInfoView from '@/components/MyInfoView.vue';

/* 컴포넌트 구성 요소 확인 { */
describe('MyInfoView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MyInfoView);
  });

  it('MyInfo Content render', () => {
    expect(wrapper.find('[data-test="myInfoView"]').exists()).toBeTruthy();
  });

  it('user name render', async () => {
    expect(wrapper.find('[data-test="userName"]').exists()).toBeTruthy();

    const username = 'AAA';
    await wrapper.setProps({ username });

    expect(wrapper.find('[data-test="userName"]').text()).toBe(username);
  });

  it('user id render', async () => {
    expect(wrapper.find('[data-test="userId"]').exists()).toBeTruthy();

    const id = 'BBB';
    await wrapper.setProps({ id });

    expect(wrapper.find('[data-test="userId"]').text()).toBe(id);
  });

  it('user email render', async () => {
    expect(wrapper.find('[data-test="userEmail"]').exists()).toBeTruthy();

    const email = 'CCC';
    await wrapper.setProps({ email });

    expect(wrapper.find('[data-test="userEmail"]').text()).toBe(email);
  });
});
/* } 컴포넌트 구성 요소 확인 끝 */
