import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients:Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('Banana',6)
  ];
  ingredientAdded = new EventEmitter<Ingredient[]>();
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
