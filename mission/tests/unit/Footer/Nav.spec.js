import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/Nav.vue';

/* 컴포넌트 구성 요소 확인 { */
describe('Nav', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Nav);
  });

  it('Nav render', () => {
    expect(wrapper.find('[data-test="nav"]').exists()).toBeTruthy();
  });

  it('메뉴 버튼은 총 4개이고 버튼에는 아이콘과 텍스트 요소가 있다.', () => {
    const menus = wrapper.findAll('[data-test="menu"]');
    expect(menus.length).toBe(4);

    const icons = ['home', 'heart', 'shopping-bag', 'profile'];

    icons.forEach((icon, index) => {
      expect(menus[index].find('[data-test="icon"]').exists()).toBe(true);
      expect(menus[index].find('[data-test="icon"]').attributes('name')).toBe(icon);
    });

    const txts = ['Home', 'Like', 'Cart', 'My'];

    txts.forEach((txt, index) => {
      expect(menus[index].find('[data-test="txt"]').exists()).toBe(true);
      expect(menus[index].find('[data-test="txt"]').text()).toBe(txt);
    });
  });
});
/* } 컴포넌트 구성 요소 확인 끝 */
