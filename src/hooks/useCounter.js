import { useReducer } from "react";

const reducer = function(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "switch":
      return { count: action.index}
  }
};

export default function(initalValue) {
  const initialState = { count: initalValue };

  return useReducer(reducer, initialState);
}
