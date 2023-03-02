import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { Recipe } from "../models/Recipe.model";
import { AuthService } from "./auth.service";
import { RecipeService } from "./recipes.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(private recipeService:RecipeService, private http:HttpClient, private authService:AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipe-book-30d11-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipes(){
        // return this.authService.user.pipe(take(1), exhaustMap(user=>{
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-30d11-default-rtdb.firebaseio.com/recipes.json').pipe(
                map(recipes=>recipes.map(recipe=>{
                    return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
                })),
                tap(recipes=>{
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
}