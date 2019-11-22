import { useReducer } from "react";
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

const handleChangeColor = (state, action) => {
  const colors = state.colors.slice(),
    { index, value } = action;
  colors[index].value = value;
  return { ...state, colors };
};

const handleAddColor = (state, action) => {
  const colors = state.colors.slice(),
    color = action.color,
    len = colors.length + 1;
  colors.forEach(item => item.weight = (1 / len));
  colors.push({
    value: color,
    weight: 1 / len
  });
  return { ...state, colors };
};

const handleDeleteColor = (state, action) => {
  const colors = state.colors.slice(),
    index = action.index,
    len = colors.length - 1;
  if(len === 0){
    return { ...state, colors };
  }
  colors.splice(index, 1);
  colors.forEach(item => item.weight = (1 / len));
  return { ...state, colors };
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
    case "changeColor":
      return handleChangeColor(state, action);
    case "addColor":
      return handleAddColor(state, action);
    case "deleteColor":
      return handleDeleteColor(state, action);
  }
};

export default function(initialState) {
  return useReducer(reducer, initialState);
}
