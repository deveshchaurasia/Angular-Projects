import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/shared/models/Recipe.model';
import { RecipeService } from 'src/app/shared/services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, OnDestroy {

  id:number;
  editMode:boolean = false;
  recipeForm:FormGroup;
  recipe:Recipe;
  @ViewChild('imagePath') imagePath; 

  paramsSubscription:Subscription;
  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.recipeFormInit(0);
    this.paramsSubscription = this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      if(this.id){
        this.editMode = true;
        this.recipe = this.recipeService.getRecipeById(this.id);
        console.log(this.recipe);
        this.recipeFormInit(this.recipe);
      }
    })
  }

  recipeFormInit(val){
    this.recipeForm = new FormGroup({
      id: new FormControl(val?.id || 0),
      name: new FormControl(val?.name, Validators.required),
      description: new FormControl(val?.description),
      imagePath: new FormControl(val?.imagePath),
      ingredients: new FormArray([])
    })

    if(val?.ingredients){
      val?.ingredients.map(v=>{
        this.getIngredientFormArray.push(
        new FormGroup({
          name: new FormControl(v?.name),
          amount: new FormControl(v?.amount)
        })
        )
      })
    }

    if(this.recipeForm.value.id==0){
      this.recipeForm.get('name').addValidators(this.checkNameExist.bind(this));
      this.recipeForm.get('name').updateValueAndValidity();
    }

    console.log(this.recipeForm);
  }

  get getIngredientFormArray(){
    return this.recipeForm.get('ingredients') as FormArray;
  }

  cancelForm(){
    this.recipeForm.reset();
  }

  addIngredient(){
    this.getIngredientFormArray.push(
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl('')
      })
    )
  }

  removeIngredient(index:number){
    this.getIngredientFormArray.removeAt(index);
  }

  submitRecipe(){
    if(this.recipeForm.invalid){
      this.recipeForm.markAllAsTouched();
      return;
    }
    let updatedRecipe = this.recipeForm.getRawValue();
    console.log(updatedRecipe);
    if(this.editMode && this.id>0){
      this.recipeService.setRecipe(updatedRecipe);
    } else{
      this.recipeService.addRecipe(updatedRecipe);
    }
  }

  checkNameExist(control:FormControl):{[key:string]:boolean}{
    let recipes = this.recipeService.getRecipes();
    if(recipes.find(v=>v.name==control.value)){
      return {'recipeExist':true}
    }
    return null;

  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
