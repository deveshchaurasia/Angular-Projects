import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameinputRef:ElementRef;
  @ViewChild('amountInput') amountinputRef:ElementRef;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
  }

  addIngredient(){
    // let ingredient = new Ingredient(this.nameinputRef.nativeElement.value, this.amountinputRef.nativeElement.value)
    this.shoppingService.addIngredient({name:this.nameinputRef.nativeElement.value,amount:this.amountinputRef.nativeElement.value});
  }

}
