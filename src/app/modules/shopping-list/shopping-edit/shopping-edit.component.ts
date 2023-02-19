import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

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
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.shoppingService.startedEditing.subscribe(v=>{
      this.editModeIndex = v;
    })
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
      this.shoppingService.updateIngredient(this.editModeIndex, slForm.value)
    }else{
      this.shoppingService.addIngredient(slForm.value);
      this.slForm.resetForm();
    }
    // let ingredient = new Ingredient(this.nameinputRef.nativeElement.value, this.amountinputRef.nativeElement.value)
  }

  deleteIngredient(){
    this.shoppingService.deleteIngredient(this.editModeIndex);
    this.shoppingService.startedEditing.next(-99);
    this.slForm.resetForm();
  }

  clearIngredients(){
    this.ingredient = null;
    this.slForm.resetForm();
    this.clearIngredient.emit();
    this.editModeIndex = -99;
    // this.shoppingService.clearIngredients();
  }

}
