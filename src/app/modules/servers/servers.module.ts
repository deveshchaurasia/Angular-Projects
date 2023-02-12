import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServersComponent } from "./servers.component";
import { ServerComponent } from './server/server.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

const routes: Routes = [
    { path: '', component: ServersComponent, children: [
        {path: 'server/:id', component: ServerComponent}
    ]}
]

    // const routes: Routes = [
    //     {path:'', component:ServersComponent, pathMatch:'full'},
    //     {path:'server/:id', component:ServerComponent}
    // ]

@NgModule({
    declarations: [ServersComponent, ServerComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatFormFieldModule
    ]
})
export class ServersModule {
}