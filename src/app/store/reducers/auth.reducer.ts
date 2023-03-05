import { AuthState } from "src/app/shared/models/authState.model";
import { AuthActions, Login } from "../actions/auth.actions";
import * as AuthAction from '../actions/auth.actions';
import { User } from "src/app/shared/models/user.model";
const initialState:AuthState = {
    user:null
}

export function authReducer(state=initialState, action:AuthActions) {
    switch (action.type){
        case AuthAction.LOGIN:
            const user = new User(
                action.payload.email, 
                action.payload.userId, 
                action.payload.token, 
                action.payload.expirationDate
                );
                return {
                    ...state,
                    user:user
                }
        case AuthAction.LOGOUT:
            return {
                ...state,
                user:null
            }
        default:
            return state;

    }

}