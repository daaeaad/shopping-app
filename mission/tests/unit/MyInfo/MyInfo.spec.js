import { shallowMount } from '@vue/test-utils';
import MyInfo from '@/views/MyInfo.vue';
import Repository from '@/repositories/RepositoryFactory';
import Client from '@/repositories/Clients/AxiosClient';

// axios mocking
jest.mock('@/repositories/Clients/AxiosClient');

/* 컴포넌트 구성 요소 확인 { */
describe('MyInfo', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MyInfo);
  });

  it('MyInfo Content render', () => {
    expect(wrapper.find('[data-test="myInfo"]').exists()).toBeTruthy();
  });

  it('내 정보를 보여주는 MyInfoView 컴포넌트를 렌더링', () => {
    expect(wrapper.findComponent({ name: 'MyInfoView' }).exists()).toBeTruthy();
  });

  it('사용자 정보를 불러온다.', async () => {
    // setup
    const users = { id: 'honggildong', email: 'honggildong@test.com', username: '홍길동' };
    const res = users;
    Client.get.mockImplementation(() => res);

    // act
    const UserRepository = Repository.get('user');
    const getUserInfo = await UserRepository.getUserInfo();

    // result
    expect(Client.get).toHaveBeenCalled();
    expect(Client.get).toHaveBeenCalledWith('/info');
    expect(getUserInfo).toEqual(users);
  });

  it('api 호출에 실패하면 users 는 0이고, MyInfoView 컴포넌트는 런더링 하지 않는다.', async () => {
    // setup
    const users = 0;
    const res = users;
    Client.get.mockImplementation(() => res);

    // act
    const UserRepository = Repository.get('user');
    const getUserInfo = await UserRepository.getUserInfo();

    // result
    expect(Client.get).toHaveBeenCalled();
    expect(Client.get).toHaveBeenCalledWith('/info');
    expect(getUserInfo).toEqual(users);

    expect(wrapper.findComponent({ name: 'MyInfoView' }).exists()).toBeFalsy();
    expect(wrapper.find('[data-test="apiError"]').exists()).toBeTruthy();
  });
});
/* } 컴포넌트 구성 요소 확인 끝 */
