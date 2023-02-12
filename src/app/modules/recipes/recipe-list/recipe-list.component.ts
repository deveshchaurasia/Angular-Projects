import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/Recipe.model';
import { RecipeService } from 'src/app/shared/services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  @Output() recipeSelected = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeSelected.emit(recipe);
  }

  createNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route} );
  }

}
