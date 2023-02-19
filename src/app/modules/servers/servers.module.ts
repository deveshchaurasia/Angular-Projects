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
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        DirectiveModules
    ]
})
export class ServersModule {
}