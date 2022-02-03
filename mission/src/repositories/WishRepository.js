import { getData } from '@/repositories/DataHandler';

const resource = '/wish';

const depth = 'items';

export default {
  // 목록
  getList() {
    return getData(`${resource}`, depth);
  },
};
