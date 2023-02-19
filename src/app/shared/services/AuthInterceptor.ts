import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newreq = req.clone({
            headers: req.headers.append('AuthToken','xyz')
        });
        return next.handle(newreq).pipe(
            tap(event=>{
                if(event.type === HttpEventType.Response){
                    console.log(event.body);
                }
            })
        )
    }
    
}