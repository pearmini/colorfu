const handleAddContent = (state, action) => {
  const contents = state.contents,
    content = action.value;
  contents.push(content);
  return { ...state, contents };
};

const handleDeleteContent = (state, action) => {
  const contents = state.contents,
    index = action.index;
  contents.splice(index, 1);
  return { ...state, contents };
};

const handleChangeContent = (state, action) => {
  const contents = state.contents,
    { index, value } = action;
  contents[index] = value;
  return { ...state, contents };
};

const reducer = (state, action) => {
  console.log(state, action)
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

export default reducer
