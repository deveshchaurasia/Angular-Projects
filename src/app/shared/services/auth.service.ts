import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind?: string;
    registered? : boolean;
}

@Injectable()
export class AuthService {
    loggedIn = false;
    private tokenExpirationTimer:any;
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router:Router) { }

    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 300);
        });
        return promise;
    }

    login(req) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            ...req,
            returnSecureToken:true
        }).pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
                console.log(resData);
            })
            );
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin(){
        const userData:{
            email:string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationTime = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
            this.autoLogout(expirationTime);
        }
    }

    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer =  setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }

    signup(val) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
            {
                email: val.email,
                password: val.password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(errorRes => {
                let errorMessage:string = 'An Unknown error occurred';
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage);
                }
                errorMessage = errorRes.error.error.message;
                return throwError(errorMessage);
            }),tap(resData=>{
                this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
            }));
    }

    private handleAuthentication(email: string, localId:string, token:string, expiresIn: number){
        const expirationDate = new Date(
            new Date().getTime() + +expiresIn * 1000
        );
        const user = new User(email, localId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(resError: HttpErrorResponse){
        let errorMessage:string = 'An Unknown error occurred';
                if(!resError.error || !resError.error.error){
                    return throwError(errorMessage);
                }
                errorMessage = resError.error.error.message;
                return throwError(errorMessage);
    }
}