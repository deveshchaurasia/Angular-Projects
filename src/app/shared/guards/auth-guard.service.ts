import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private authService:AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean| UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        return this.authService.user.pipe(
            take(1),
            map(user=>{
                const isAuth = !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        )
        // return this.authService.isAuthenticated().then(
        //     (authenticated:boolean)=>{
        //         if(authenticated){
        //             return true;
        //         }
        //         else{
        //             this.router.navigate(['/']);
        //             return false;
        //         }
        //     }
        // )
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        return this.canActivate(route,state)
    }
}