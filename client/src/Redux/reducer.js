import { ADD_RECIPES, NEXT_PAGE, PREV_PAGE, ADD_DIETS, FILTER, ORDER } from "./actions";



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
              t.Diets.find((e) => e.name === payload)
            );
      return {
        ...state,
        recipes: typeDietFilter,
        allRecipes: typeDietFilter,
      };

   // reducer.js
case ORDER:
  const newOrder = [...state.recipesOriginal];
  return {
    ...state,
    recipes:
      payload === "A"
        ? newOrder.sort((a, b) => (a.name > b.name ? 1 : -1)) // Orden ascendente por nombre
        : newOrder.sort((a, b) => (b.name > a.name ? 1 : -1)), // Orden descendente por nombre
  };

  default:
    return state
 }
}