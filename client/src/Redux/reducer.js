import { ADD_RECIPES, NEXT_PAGE, PREV_PAGE, ADD_DIETS, FILTER, ORDER, ORDER_BYDIET, FILTER_BY_DIETS, RESET, FILTER_BY_NAME, FILTER_BY_CREATED } from "./actions";



const initialState = {
  recipes:[],
  recipesOriginal:[],
  numPage:1,
  diets:[]
};

export default function reducer(state = initialState, { type, payload }) {
 switch (type) {
  case ADD_RECIPES:
    return {
      ...state,
      recipes:payload,
      recipesOriginal:payload
    }
    case NEXT_PAGE:
      return {
        ...state,
        numPage: state.numPage + 1,
      };

    case PREV_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case ADD_DIETS:
      return {
        ...state,
        diets: payload
      };
    case FILTER:
      const allRec = state.allRecipes;
      const typeDietFilter =
        payload === "All"
          ? allRec
          : allRec.filter((t) =>
              t.diets.find((e) => e.name === payload)
            );
      return {
        ...state,
        recipes: typeDietFilter,
        allRecipes: typeDietFilter,
      };

case ORDER:
  const newOrder = [...state.recipesOriginal];
  return {
    ...state,
    recipes:
      payload === "A"
        ? newOrder.sort((a, b) => (a.name > b.name ? 1 : -1)) 
        : newOrder.sort((a, b) => (b.name > a.name ? 1 : -1)), 
  };
  case ORDER_BYDIET:
    const newOrderHealthscore = [...state.recipesOriginal];
    return {
      ...state,
      recipes:
        payload === 'A'
          ? newOrderHealthscore.sort((a, b) => a.healthScore - b.healthScore) 
          : newOrderHealthscore.sort((a, b) => b.healthScore - a.healthScore), 
    };
    case FILTER_BY_DIETS:
      return {
        ...state,
        recipes: payload, 
      };
    case FILTER_BY_CREATED:
      return {
        ...state,
        recipes: payload,
      };

    case RESET:
      return {
        ...state,
        recipes: state.recipesOriginal, 
      };
    case FILTER_BY_NAME:
      return {
        ...state,
        recipes: payload, 
      };
  default:
    return state
 }
}