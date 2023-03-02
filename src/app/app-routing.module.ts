import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth-guard.service';

const routes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes', canActivate:[AuthGuard], loadChildren: () => import('./modules/recipes/recipes.module').then(mod => mod.RecipesModule)},
  {path:'shopping-list', loadChildren: () => import('./modules/shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule)},
  {path:'servers', loadChildren: ()=> import('./modules/servers/servers.module').then(mod => mod.ServersModule)},
  {path:'auth', loadChildren: ()=> import('./components/auth/auth.module').then(mod => mod.AuthModule)},
  {path:'pageNotFound',component:PageNotFoundComponent},
  {path:'**', redirectTo:'pageNotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
