import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const LOGIN_START = '[Auth] Login_Start';
export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const AUTHENTICATE_FAIL = '[Auth] LoginFail';
export const SIGNUP_START = '[Auth] SignupStart';
export const SIGNUP = '[Auth] Signup';
export const LOGOUT = '[Auth] LOGOUT';
export const CLEAR_ERROR = '[Auth] ClearError';

export class AuthenticateSuccess implements Action{
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: {
        email:string,
        userId:string,
        token:string,
        expirationDate:Date
    }){}
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload:{email: string, password: string}){}
}

export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload:string){}
}

export class SignupStart implements Action{
    readonly type = SIGNUP_START;
    constructor(public payload:any){}
}

export class Signup implements Action{
    readonly type = SIGNUP;
    constructor(public payload:any){}
}

export class ClearError implements Action{
    readonly type = CLEAR_ERROR;
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError;

