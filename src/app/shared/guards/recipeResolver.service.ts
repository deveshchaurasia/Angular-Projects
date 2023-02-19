import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../models/Recipe.model";
import { RecipeService } from "../services/recipes.service";

@Injectable()
export class RecipeResolver implements Resolve<Recipe>{

    constructor(private recipeService:RecipeService){}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<Recipe>|Promise<Recipe>|Recipe {
            const recipe = this.recipeService.getRecipeById(+route.paramMap.get('id'));
            console.log(recipe);
            return recipe;
        }
}