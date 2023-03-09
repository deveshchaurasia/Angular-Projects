import { ActionReducerMap } from "@ngrx/store";
import { AuthState } from "src/app/shared/models/authState.model";
import { IngredientState } from "src/app/shared/models/IngredientState.model";
import { authReducer } from "./auth.reducer";
import { shoppingListReducer } from "./shopping-list.reducer";

export interface AppState {
    shoppingList: IngredientState;
    auth: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
};