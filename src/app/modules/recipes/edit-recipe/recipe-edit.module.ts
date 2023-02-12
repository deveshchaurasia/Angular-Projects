import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EditRecipeComponent } from "./edit-recipe.component";


@NgModule({
    declarations:[
        EditRecipeComponent
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class RecipeEditModule{

}