import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
  }

  toShoppingList(){
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

}
