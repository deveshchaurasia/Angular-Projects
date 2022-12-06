import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
      this.ingredients = this.shoppingService.getIngredients();
      this.shoppingService.ingredientAdded.subscribe((ingredient=>{
      this.ingredients = ingredient;
    }))
  }

}
