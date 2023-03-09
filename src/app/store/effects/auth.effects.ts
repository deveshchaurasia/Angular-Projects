import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";
import { AuthResponseData } from "src/app/shared/services/auth.service";
import { environment } from "src/environments/environment";
import * as AuthActions from '../actions/auth.actions';

const handleAuthentication = (resData) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    return new AuthActions.AuthenticateSuccess({ email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate })
}

const handleError = (resError:any) => {
    let errorMessage: string = 'An Unknown error occurred';
    if (!resError.error || !resError.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    errorMessage = resError.error.error.message;
    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
            {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }
        ).pipe(
            map(resData => {
                return handleAuthentication(resData)
            }),catchError(resError =>{
                return handleError(resError)
            })
        )
    }
));

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => {
                        return handleAuthentication(resData)
                    }),
                    catchError(resError => {
                       return handleError(resError);
                    })
                )
        }))

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap(() => {
        this.router.navigate(['/']);
    }))

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }  // $ after every observable as convention

}