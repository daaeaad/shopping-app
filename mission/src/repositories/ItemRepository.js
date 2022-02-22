import { getData } from '@/repositories/DataHandler';

const resource = '/item';

const depth = 'items';

export default {
  // 목록
  getList() {
    return getData(`${resource}`, depth);
  },
  // 상세
  getDetail(id) {
    return getData(`item_detail/${id}`, 'item');
  },

  //
  getOrderList(id) {
    return getData('/search_list', '', { id });
  },
};

/*
class OrderItemModel {
  constructor(
    id,
    name,
    image,
    originalPrice,
    price,
    stockCount,
    description,
    like,
    options,
    store,
    quantity,
    totalPrice,
  ) {
    this.product_no = id;
    this.name = name;
    this.image = image;
    this.original_price = originalPrice;
    this.price = price;
    this.stock_count = !stockCount ? 0 : stockCount;
    this.description = description;
    this.like = like;
    this.options = options;
    this.store = store;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}
*/
