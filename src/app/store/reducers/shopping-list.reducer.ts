import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/models/ingredient.model";
import { IngredientState } from "src/app/shared/models/IngredientState.model";
import * as ShoppingListActions from '../actions/shopping-list.actions';


const initialState:IngredientState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex:-1
};

// if no argument is passed in this function then this initial state is set to state inside reducer function

export function shoppingListReducer(state:IngredientState = initialState, action:ShoppingListActions.ShoppingListActions) {
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:[...state.ingredients,...action.payload]
            };
                // always add your data immutably in store state
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index]
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient
            return {
                ...state,
                ingredients:updatedIngredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            // const updatedList = state.ingredients.splice(action.payload,1)
            return {
                ...state,
                ingredients:state.ingredients.filter((ig, igIndex)=>{
                    return igIndex !== action.payload;
                })
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex:action.payload,
                editedIngredient:{...state.ingredients[action.payload]}
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex:-1
            }
        default:
            return state;
    }
}