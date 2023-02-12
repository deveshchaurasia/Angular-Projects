import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/shared/models/Recipe.model';
import { RecipeService } from 'src/app/shared/services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  selectedRecipe:Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
