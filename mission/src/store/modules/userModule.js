import Repository from '@/repositories/RepositoryFactory';

const userRepository = Repository.get('user');

const userModule = {
  namespaced: true,

  /* ******** state { ******** */
  state: () => ({
    user: {},
  }),
  /* ******** } state 끝 ******** */

  /* ******** mutations { ******** */
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
  /* ******** } mutations 끝 ******** */

  /* ******** actions { ******** */
  actions: {
    setUser: async ({ commit }) => {
      const userData = await userRepository.getUserInfo();

      const result = !userData ? userData : userData.data;

      commit('setUser', result);
    },
  },
  /* ******** } actions 끝 ******** */

  /* ******** getters { ******** */
  getters: {
    /* 사용자 정보 { */
    getUser: (state) => {
      const result = state.user;

      return result;
    },
    /* } 사용자 정보 끝 */
  },
  /* ******** } getters 끝 ******** */
};

export default userModule;
