import ItemRepository from '@/repositories/ItemRepository';
import WishRepository from './WishRepository';
import UserRepository from './UserRepository';

const repositories = {
  item: ItemRepository,
  wish: WishRepository,
  user: UserRepository,
};

export default {
  get: (name) => repositories[name],
};
