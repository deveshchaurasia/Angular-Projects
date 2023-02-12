import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AddServerComponent } from "./add-server.component";

@NgModule({
    declarations:[
        AddServerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[
        AddServerComponent
    ]
})
export class AddServerModule{

}