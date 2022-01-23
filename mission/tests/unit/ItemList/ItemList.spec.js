import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemList.vue';

describe('ItemListPage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('redners ItemListPage', () => {
    expect(wrapper.find('#item-list-page').exists()).toBe(true);
  });

  it('Header 컴포넌트를 렌더링 합니다.', () => {
    expect(wrapper.findComponent({ name: 'Header' }).exists()).toBeTruthy();
  });

  it('Footer 컴포넌트를 렌더링 합니다.', () => {
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBeTruthy();
  });

  it('ItemListItem 컴포넌트를 렌더링 합니다.', () => {
    expect(wrapper.findComponent({ name: 'ItemListItem' }).exists()).toBeTruthy();
  });

  it('ItemListItem 컴포넌트는 datas 배열 개수만큼 렌더링 됩니다.', () => {
    // const datas = [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }];
    // const mockFn = jest.fn().mockImplementation(() => {
    //   let result;
    //   return result;
    // });
    // const test = mockFn();

    expect(wrapper.findAllComponents({ name: 'ItemListItem' }).length).toBe(2);
  });
});
