import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeEditModule } from './edit-recipe/recipe-edit.module';
import { DirectiveModules } from 'src/app/shared/directives';
import { RecipeResolver } from 'src/app/shared/guards/recipeResolver.service';
import { RecipeGuard } from 'src/app/shared/guards/recipeGuard.service';

const routes: Routes = [
  {
    path: '', component: RecipesComponent,children: [
      { path: 'new', component: EditRecipeComponent },
      { path: ':id/edit', component: EditRecipeComponent,canActivate:[RecipeGuard],resolve: [RecipeResolver] },
      { path: ':id', component: RecipeDetailComponent,canActivate:[RecipeGuard], resolve: [RecipeResolver] }
    ]
  },
]

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    RecipeEditModule,
    DirectiveModules
  ],
  providers:[RecipeResolver, RecipeGuard]
})
export class RecipesModule { }
