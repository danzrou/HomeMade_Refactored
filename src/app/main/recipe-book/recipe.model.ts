export interface Recipe {
  id?: number,
  ingredients: Ingredient[],
  avgCookTime: string,
  servings: number,
  directions: RecipeDirection[]
}

export interface Ingredient {
  name: string,
  amount?: number,
  measure?: string
}

export interface RecipeDirection {
  step: number,
  description: string
}
