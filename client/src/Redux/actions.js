export const ADD_RECIPES = 'ADD_RECIPES'
export const PREV_PAGE = 'PREV_PAGE'
export const NEXT_PAGE = 'NEXT_PAGE'
export const ADD_DIETS = 'ADD_DIETS'
export const FILTER = 'FILTER'
export const ORDER = 'ORDER'
export const ORDER_BYDIET = 'ORDER_BYDIET'


export function addRecipes (recipes) {
    return{
        type: ADD_RECIPES,
        payload : recipes
    }
}
export function prevPage () {
    return{
        type: PREV_PAGE,
    }
}
export function nextPage () {
    return{
        type: NEXT_PAGE,
    }
}
export function addDiets (diets) {
    return{
        type: ADD_DIETS,
        payload:diets
    }
}
export function filterByDiets (diets) {
    console.log(diets)
    return{
        type: FILTER,
        payload : diets
    }
}

export function order (order) {
    return{
        type: ORDER,
        payload : order
    }
}
export const orderByHealthscore = (diet) => {
    return {
      type: ORDER_BYDIET,
      payload: diet,
    };
  };