import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as ShoppingListActions from '../../store/actions/shopping-list.actions';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[]}>;
  selectedIngredient: Ingredient;
  selectedIndex:number;

  private ingSubscription: Subscription;
  constructor(private shoppingService: ShoppingService, private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingService.getIngredients();
    // this.ingSubscription = this.shoppingService.ingredientAdded.subscribe((ingredient => {
    //   this.ingredients = ingredient;
    // }))
    this.shoppingService.startedEditing.subscribe(v=> this.selectedIndex = v);
  }

  onSelect(index: number) {
    this.selectedIngredient = this.ingredients[index];
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    this.selectedIndex = index;
  }

  onDestroy() {
    // this.ingSubscription.unsubscribe();
  }

}
