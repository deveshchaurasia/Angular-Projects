import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipeService } from "../services/recipes.service";

@Injectable()
export class RecipeGuard implements CanActivate, CanActivateChild{

    constructor(private recipeService:RecipeService){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
        const recipe = this.recipeService.getRecipeById(+route.paramMap.get('id'));
        return recipe!=undefined;
    }

    canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
        return this.canActivate(route,state);
    }

}