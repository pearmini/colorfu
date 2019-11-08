import {useReducer} from "react";

// [left,right)
export default function(initalValue, left, right) {
  const initialState = { count: initalValue };
  const reducer = function(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
        
    }
  };
  return useReducer(reducer, initialState);
}
