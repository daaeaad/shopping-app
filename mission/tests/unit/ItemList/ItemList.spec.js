import { shallowMount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';
import Repository from '@/repositories/RepositoryFactory';
import Client from '@/repositories/Clients/AxiosClient';

// axios mocking
jest.mock('@/repositories/Clients/AxiosClient');

describe('ItemListPage', () => {
  let wrapper;

  beforeEach(async () => {
    const items = [{ id: 123 }, { id: 456 }];
    const res = {
      data: {
        items,
      },
    };
    await Client.get.mockImplementation(() => res);

    wrapper = shallowMount(ItemListPage);
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

  it('ItemListItem 컴포넌트는 products 배열 개수만큼 렌더링 됩니다.', () => {
    expect(wrapper.findAllComponents({ name: 'ItemListItem' }).length).toBe(2);
  });
});

/* Repository Test { */
describe('api 호출 테스트', () => {
  it('상품 목록 data', async () => {
    // setup
    const items = [{ id: 123 }];
    const res = {
      data: {
        items,
      },
    };
    Client.get.mockImplementation(() => res);

    // act
    const ItemRepository = Repository.get('item');
    const getList = await ItemRepository.getList();

    // result
    expect(Client.get).toHaveBeenCalled();
    expect(Client.get).toHaveBeenCalledWith('/item');
    expect(getList).toEqual(items);
  });

  it('찜 목록 data', async () => {
    // setup
    const items = [{ id: 123 }, { id: 311 }];
    const res = {
      data: {
        items,
      },
    };
    Client.get.mockImplementation(() => res);

    // act
    const WishRepository = Repository.get('wish');
    const getList = await WishRepository.getList();

    // result
    expect(Client.get).toHaveBeenCalled();
    expect(Client.get).toHaveBeenCalledWith('/wish');
    expect(getList).toEqual(items);
  });
});
/* } Repository Test 끝 */
