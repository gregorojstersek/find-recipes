import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../shared/recipes.service';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-recipes-display',
  templateUrl: './recipes-display.component.html'
})
export class RecipesDisplayComponent implements OnInit {

  recipes: Array<Recipe> = [];
  recipesDataReceived: boolean;

  canSearchMore: boolean;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.getRecipesData().subscribe((data) => {
      // console.log(data);
      if (data.action === 'add') {
        this.recipes.push(...this.handleRecipesData(data.recipes));
      } else if (data.action === 'replace') {
        this.recipes = this.handleRecipesData(data.recipes);
      }
      this.recipesDataReceived = true;
    });
  }

  handleRecipesData = (recipes) => {
    recipes.forEach(recipe => {
      recipe.ingredients = recipe.ingredients.split(', ');
    });

    this.canSearchMore = recipes.length === 10 ? true : false;

    return recipes;
  }

  addToIngredients = (ingredient: string) => {
    this.recipesService.addIngredient(ingredient);
  }

  searchMore = () => {
    this.recipesService.getMoreRecipes();
  }

}
