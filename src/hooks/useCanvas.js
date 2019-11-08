import { useReducer } from "react";
export default function(initialState) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return action.canvas;
      case "change":
        return { ...state, [action.key]: action.value };
      case "changeImage":
        return { ...state, imageURL: action.imageURL };
      case "addContent": {
        const contents = state.contents,
          content = action.value;
        contents.push(content);
        return { ...state, contents };
      }
      case "deleteContent": {
        const contents = state.contents,
          index = action.index;
        contents.splice(index, 1);
        return { ...state, contents };
      }
      case "changeContent": {
        const contents = state.contents,
          { index, value } = action;
        contents[index] = value;
        return { ...state, contents };
      }
    }
  };
  return useReducer(reducer, initialState);
}
