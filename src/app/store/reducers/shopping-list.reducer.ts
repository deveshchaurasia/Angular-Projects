// import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/models/ingredient.model";

const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10),
    ]
};

// if no argument is passed in this function then this initial state is set to state inside reducer function

export function shoppingListReducer(state = initialState, action:Action) {
    switch(action.type){

    }
}