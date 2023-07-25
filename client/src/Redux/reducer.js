import { ADD_RECIPES } from "./actions";



const initialState = {
  recipes:[]
};

export default function reducer(state = initialState, { type, payload }) {
 switch (type) {
  case ADD_RECIPES:
    return {
      ...state,
      recipes:payload
    }
 
  default:
    return state
 }
}