import { AuthState } from "src/app/shared/models/authState.model";
import { AuthActions } from "../actions/auth.actions";
import * as AuthAction from '../actions/auth.actions';
import { User } from "src/app/shared/models/user.model";

const initialState:AuthState = {
    user:null,
    authError: null,
    loading:false
}

export function authReducer(state=initialState, action:AuthActions) {
    switch (action.type){
        case AuthAction.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email, 
                action.payload.userId, 
                action.payload.token, 
                action.payload.expirationDate
                );
                return {
                    ...state,
                    user:user,
                    authError: null,
                    loading: false
                }
        case AuthAction.LOGOUT:
            return {
                ...state,
                user:null
            }
        
        case AuthAction.LOGIN_START:
        case AuthAction.SIGNUP_START:
            return {
                ...state,
                authError:null,
                loading: true
            }

        case AuthAction.AUTHENTICATE_FAIL:
            return {
                ...state,
                user:null,
                authError: action.payload,
                loading: false
            }
        case AuthAction.CLEAR_ERROR:
            return {
                ...state,
                authError:null
            }
             
        default:
            return state;

    }

}