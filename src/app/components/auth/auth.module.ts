import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/sharedModule.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[AuthComponent],
    imports:[
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild([{path:'', component:AuthComponent}])
    ]
})
export class AuthModule{}