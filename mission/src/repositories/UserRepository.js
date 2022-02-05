// import Client from '@/repositories/Clients/AxiosClient';
import { getData } from '@/repositories/DataHandler';

const resource = '/info';

export default {
  // 목록
  getUserInfo() {
    return getData(`${resource}`);
  },
};
