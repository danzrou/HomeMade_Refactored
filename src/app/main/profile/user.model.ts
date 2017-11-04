import { Order } from '../orders/order.model';
import { Dish } from '../dishes/dish.model';

export interface UserContext {
  user: User,
  orders: Array<Order>,
  dishes: Array<Dish>
}

export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  city: string,
  address: string,
  houseNum: number,
  zip?: number,
  email: string,
  producer: boolean,
  profileImg?: string,
  createdDate?: string
}


