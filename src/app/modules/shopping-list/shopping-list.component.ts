import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  selectedIndex:number;

  private ingSubscription: Subscription;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingSubscription = this.shoppingService.ingredientAdded.subscribe((ingredient => {
      this.ingredients = ingredient;
    }))
    this.shoppingService.startedEditing.subscribe(v=> this.selectedIndex = v);
  }

  onSelect(index: number) {
    this.selectedIngredient = this.ingredients[index];
    this.shoppingService.startedEditing.next(index);
    this.selectedIndex = index;
  }

  onDestroy() {
    this.ingSubscription.unsubscribe();
  }

}
