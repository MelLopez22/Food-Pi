import {
  ORDER_BY_SOURCE,
  CLEAN_DETAIL,
  GET_BY_ID,
  GET_BY_NAME,
  GET_RECIPES,
  GET_TYPE_DIETS,
  FILTER_BY_TYPEDIET,
  ORDER_BY_NAME,
  ORDER_BY_PUNTUATION,
  POST_RECIPE,
  RESET_RECIPES,
  RESET_RECIPES_SEARCHED,
  HANDLE_NUMBER,
  PREV_PAGE,
  NEXT_PAGE,
} from "./actions";

const initialState = {
  allRecipes: [],
  recipes: [],
  typeDiets: [],
  details: {},
  searchedRecipes: [],
  numPage: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        details: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        details: [],
      };

    case GET_TYPE_DIETS:
      return {
        ...state,
        typeDiets: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };

    case FILTER_BY_TYPEDIET:
      const allRec = state.allRecipes;
      const typeDietFilter =
        action.payload === "All"
          ? allRec
          : allRec.filter((t) =>
              t.TypeDiets.find((e) => e.name === action.payload)
            );
      return {
        ...state,
        recipes: typeDietFilter,
        allRecipes: typeDietFilter,
      };

    case ORDER_BY_SOURCE:
      const stateCopy = [...state.allRecipes];
      const fromApi = stateCopy.filter((recipe) => !isNaN(+recipe.id));
      const fromBDD = stateCopy.filter((recipe) => isNaN(+recipe.id));
      return {
        ...state,
        recipes: action.payload === "API" ? fromApi : action.payload === "BDD" ? fromBDD : stateCopy,
      };

    case ORDER_BY_NAME:
      let order =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };

    case ORDER_BY_PUNTUATION:
      let orderpunt =
        action.payload === "menormayor"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderpunt,
      };

    case RESET_RECIPES:
      return {
        ...state,
        recipes: [...state.allRecipes],
        searchedRecipes: [],
      };

    case RESET_RECIPES_SEARCHED:
      return {
        ...state,
        recipes: [...state.searchedRecipes],
      };

    case HANDLE_NUMBER:
      return {
        ...state,
        numPage: action.payload,
      };

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

    default:
      return state;
  }
}

export default rootReducer;
