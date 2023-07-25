import { ADD_RECIPES } from "./actions";



const initialState = {
  recipes:[],
  recipesOriginal:[]
};

export default function reducer(state = initialState, { type, payload }) {
 switch (type) {
  case ADD_RECIPES:
    return {
      ...state,
      recipes:payload,
      recipesOriginal:payload
    }
 
  default:
    return state
 }
}