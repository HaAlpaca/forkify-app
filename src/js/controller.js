import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot) {
  module.hot.accept()
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);
    // console.log(model.state.recipe)
    // render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    // get query
    const query = searchView.getQuery();
    if (!query) return;
    // find and clear input
    await model.loadSearchResults(query);

    resultsView.renderSpinner()
    resultsView.render(model.state.search.results)
  } catch (error) {
    console.log(err);
  }
};

// controlRecipe();
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
controlSearchResults();
