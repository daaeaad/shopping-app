import { getData, postData } from '@/repositories/DataHandler';

const resource = '/wish';

const depth = 'items';

export default {
  // 목록
  getList() {
    return getData(`${resource}`, depth);
  },

  // 등록
  postList(id) {
    return postData(`${resource}`, { itemNo: id });
  },
};
