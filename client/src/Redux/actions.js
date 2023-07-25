export const ADD_RECIPES = 'ADD_RECIPES'

export function addRecipes (recipes) {
    return{
        type: ADD_RECIPES,
        payload : recipes
    }
}