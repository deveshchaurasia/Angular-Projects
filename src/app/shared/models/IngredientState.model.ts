import { Ingredient } from "./ingredient.model";

export interface IngredientState{
    ingredients: Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex:number;
}