import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServersComponent } from "./servers.component";
import { ServerComponent } from './server/server.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DirectiveModules } from "src/app/shared/directives";
import { AuthGuard } from "src/app/shared/guards/auth-guard.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { SharedModule } from "src/app/shared/sharedModule.module";

const routes: Routes = [
    { path: '', component: ServersComponent, canActivateChild: [AuthGuard], children: [
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
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatFormFieldModule
    ]
})
export class ServersModule {
}