import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/shared/services/recipes.service';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  @Input() recipe;
  id:number;

  paramsSubscription:Subscription;
  constructor(private shoppingService:ShoppingService, private route:ActivatedRoute, private router:Router, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    })
  }

  toShoppingList(){
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

  editRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  deleteRecipe(){
    this.recipeService.deleteRecipeById(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
