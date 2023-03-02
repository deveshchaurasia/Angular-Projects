import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DirectiveModules } from "./directives";
import { PlaceholderDirective } from "./directives/placeholder.directive";
import { LoadingSpinnerComponent } from "./spinner/loading-spinner.component";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective, 
    ],
    imports:[
        CommonModule,
        DirectiveModules
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DirectiveModules,
        CommonModule
    ]
})
export class SharedModule{

}