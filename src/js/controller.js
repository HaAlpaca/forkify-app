const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706'
    )
    const data = await res.json()
    let { recipe } = data.data
    if (!res.ok) throw new Error(`${data.message} (${res.status})`)
    recipe = {
    cooking_time: recipe.cooking_time,
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    source_url: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
  }
  console.log(recipe)
  } catch (error) {
    alert(error)
  }
}

showRecipe()