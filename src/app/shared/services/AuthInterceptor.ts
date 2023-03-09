import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromRoot from "../../store/reducers/index"
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:AuthService, private store:Store<fromRoot.AppState>){ }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(Res=>{
                console.log("user",Res);
                if(!Res){
                    return next.handle(req);
                }
               const newReq = req.clone({
                // headers: req.headers.append('AuthToken',Res.token),
                params: new HttpParams().set('auth', Res.token)
            });
            console.log(Res.token);
            console.log(Res);
            return next.handle(newReq).pipe(
                tap(event=>{
                    if(event.type === HttpEventType.Response){
                        console.log(event.body);
                    }
                })
            )
        })
     )
        // const newreq = req.clone({
        //     // headers: req.headers.append('AuthToken','xyz')
        // });
        // return next.handle(newreq).pipe(
        //     tap(event=>{
        //         if(event.type === HttpEventType.Response){
        //             console.log(event.body);
        //         }
        //     })
        // )
    }
    
}