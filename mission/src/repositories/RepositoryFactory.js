import ItemRepository from '@/repositories/ItemRepository';
import WishRepository from './WishRepository';
import UserRepository from './UserRepository';
import CartRepository from './CartRepository';

const repositories = {
  item: ItemRepository,
  wish: WishRepository,
  user: UserRepository,
  cart: CartRepository,
};

export default {
  get: (name) => repositories[name],
};
