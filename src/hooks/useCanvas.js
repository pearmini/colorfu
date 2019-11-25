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
  colors.forEach(item => (item.weight = 1 / len));
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
  if (len === 0) {
    return { ...state, colors };
  }
  colors.splice(index, 1);
  colors.forEach(item => (item.weight = 1 / len));
  return { ...state, colors };
};

const handleChangeColorRange = (state, action) => {
  const { index, range, ticks } = action.payload;
  const colors = state.colors.slice();

  // 判断是否越界
  if (
    (index >= 1 && range[0] <= ticks[index - 1] ) ||
    (index < ticks.length - 2 && range[1] >= ticks[index + 2] )
  ) {
    return state;
  }

  [ticks[index], ticks[index + 1]] = range;
  const weight = [];
  ticks.forEach((item, index) => {
    if (index === 0) {
      return;
    }
    weight.push((ticks[index] - ticks[index - 1]) / 100);
  });
  colors.forEach((item, index) => (item.weight = weight[index]));

  return { ...state, colors };
};

function handleRatioChange(state, action){
  console.log(action);
  const value = action.value;
  const ratio = value / 100;
  return {...state, ratio};
}

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
    case "changeColorRange":
      return handleChangeColorRange(state, action);
    case "changeRatio":
      return handleRatioChange(state, action);
  }
};

export default function(initialState) {
  return useReducer(reducer, initialState);
}
