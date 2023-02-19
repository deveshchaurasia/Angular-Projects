import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes', loadChildren: () => import('./modules/recipes/recipes.module').then(mod => mod.RecipesModule)},
  {path:'shopping-list', loadChildren: () => import('./modules/shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule)},
  {path:'servers', loadChildren: ()=> import('./modules/servers/servers.module').then(mod => mod.ServersModule)},
  {path:'pageNotFound',component:PageNotFoundComponent},
  {path:'**', redirectTo:'pageNotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
