import Client from '@/repositories/Clients/AxiosClient';

// GET
// req: api url
// depth: data object key name
export const getData = async (req, depth = '', params = {}) => {
  let result;

  try {
    let res;
    if (!params) {
      res = await Client.get(req);
    } else {
      res = await Client.get(req, { params });
    }

    if (!depth) {
      result = res;
    } else {
      result = res.data[`${depth}`];
    }
  } catch (err) {
    result = 0;
    console.log(err);
  }

  return result;
};

// POST
// req: api url
// params: parameter
export const postData = async (req, params = {}) => {
  let result;

  try {
    const res = await Client.post(req, { params });
    if (res.status === 200) result = 1;
  } catch (err) {
    result = 0;
    console.log(err);
  }

  return result;
};
