import { Dish } from '../dishes/dish.model';

export interface Order {
  id?: number,
  dish: Dish,
  amount?: number,
  sellerId: number,
  buyerId: number,
  purchaseDate?: string,
  pickupDate?: string,
  totalPrice?: number,
  paypalPaymentId?: string,
  rating?: number,
  notes: string
}
