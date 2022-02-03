import ItemRepository from '@/repositories/ItemRepository';
import WishRepository from './WishRepository';

const repositories = {
  item: ItemRepository,
  wish: WishRepository,
};

export default {
  get: (name) => repositories[name],
};
