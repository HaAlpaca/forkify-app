import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`)
    let { recipe } = data.data;
    state.recipe = {
      cooking_time: recipe.cooking_time,
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (error) {
    console.log(error)
  }
};
