import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/Recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSelected(){
    this.recipeSelected.emit(this.recipe);
    this.router.navigate([this.recipe.id], {relativeTo:this.route});
  }

}
