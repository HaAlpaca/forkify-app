import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //  update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

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
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    // render result
    resultsView.render(model.getSearchResultsPage());
    // render pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update recipe serving
  model.updateServings(newServings);
  // update recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);
  //
  //
};

// controlRecipe();
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
controlSearchResults();
