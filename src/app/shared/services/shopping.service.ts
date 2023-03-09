import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Ingredient } from '../models/ingredient.model';
import * as ShoppingListAction from '../../store/actions/shopping-list.actions'
import * as fromRoot from '../../store/reducers';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients:Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('Banana',6)
  ];
  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor(private store:Store<fromRoot.AppState>) { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients));
    // this.ingredients.push(...ingredients);
    // this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIngredient:Ingredient){
    this.ingredients[index] = newIngredient;
    console.log(newIngredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
