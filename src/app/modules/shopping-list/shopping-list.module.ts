import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

const routes: Routes = [{path: '',component: ShoppingListComponent}]

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShoppingListModule { }
