// import Client from '@/repositories/Clients/AxiosClient';
import { getData } from '@/repositories/DataHandler';

const resource = '/item';

const depth = 'items';

export default {
  // 목록
  getList() {
    return getData(`${resource}`, depth);
    // return Client.get(`${resource}`);
  },
  // 상세
  getDetail(id) {
    return getData(`${resource}/${id}`, depth);
  },
};
