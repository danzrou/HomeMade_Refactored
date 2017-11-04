import { User } from '../profile/user.model';
import {Recipe} from "../recipe-book/recipe.model";

export interface Dish {
  id?: number,
  name: string,
  description: string,
  recipe?: Recipe,
  recipeId?: number,
  ingredients: string,
  price: number,
  cookDate?: string,
  avlAmount?: number,
  avgRate?: number,
  imgUrl?: string,
  kosher: boolean,
  seller?: User,
  status?: number
}
