import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../../store/actions/shopping-list.actions';
import * as fromRoot from '../../../store/reducers';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnChanges {

  @ViewChild('nameInput') nameinputRef:ElementRef;
  @ViewChild('amountInput') amountinputRef:ElementRef;
  @Input() ingredient;
  @Output() clearIngredient = new EventEmitter();
  @ViewChild('shopForm') slForm:NgForm;
  editModeIndex:number;
  subscription:Subscription;
  constructor(private shoppingService:ShoppingService, private store:Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    // this.shoppingService.startedEditing.subscribe(v=>{
    //   this.editModeIndex = v;
    // })
    this.subscription = this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex>-1){
        this.editModeIndex = stateData.editedIngredientIndex;
        this.ingredient = stateData.editedIngredient;
        this.initIngredientForm(this.ingredient);
      }
    });
  }

  ngOnChanges(){
    if(this.ingredient!=undefined){
      this.initIngredientForm(this.ingredient);
    }
  }

  initIngredientForm(ingredient:Ingredient){
    console.log(ingredient);
    console.log(this.slForm);
    this.slForm.setValue(ingredient);
  }

  saveIngredient(slForm:NgForm){
    if(slForm.invalid){
      this.slForm.form.markAllAsTouched();
      return;
    }
    if(this.editModeIndex>-1){
      // this.shoppingService.updateIngredient(this.editModeIndex, slForm.value)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editModeIndex,ingredient:slForm.value}));
      this.store.dispatch(new ShoppingListActions.StartEdit(this.editModeIndex));
    }else{
      // this.shoppingService.addIngredient(slForm.value);
      this.store.dispatch(new ShoppingListActions.AddIngredient(slForm.value));
      this.slForm.resetForm();
    }
    // let ingredient = new Ingredient(this.nameinputRef.nativeElement.value, this.amountinputRef.nativeElement.value)
  }

  deleteIngredient(){
    // this.shoppingService.deleteIngredient(this.editModeIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editModeIndex));
    this.shoppingService.startedEditing.next(-99);
    this.slForm.resetForm();
  }

  clearIngredients(){
    this.ingredient = null;
    this.slForm.resetForm();
    this.clearIngredient.emit();
    this.editModeIndex = -99;
    this.store.dispatch(new ShoppingListActions.StopEdit());
    // this.shoppingService.clearIngredients();
  }

  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

}
