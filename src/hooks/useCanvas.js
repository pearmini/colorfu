import {useReducer} from 'react'
const handleAddContent = (state, action) => {
  const contents = state.contents.slice(),
    content = action.value;
  contents.push(content);
  return { ...state, contents };
};

const handleDeleteContent = (state, action) => {
  const contents = state.contents.slice(),
    index = action.index;
  contents.splice(index, 1);
  return { ...state, contents };
};

const handleChangeContent = (state, action) => {
  const contents = state.contents.slice(),
    { index, value } = action;
  contents[index] = value;
  return { ...state, contents };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return action.canvas;
    case "change": 
      return { ...state, [action.key]: action.value };
    case "changeImage":
      return { ...state, imageURL: action.imageURL };
    case "addContent":
      return handleAddContent(state, action);
    case "deleteContent":
      return handleDeleteContent(state, action);
    case "changeContent":
      return handleChangeContent(state, action);
  }
};

export default function(initialState){
  return useReducer(reducer, initialState)
}

