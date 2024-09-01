import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
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
    console.log(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  //forkify-api.herokuapp.com/api/v2/recipes?search=pizza
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        sourceUrl: rec.image_url,
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
      };
    });
    console.log(state.search);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
