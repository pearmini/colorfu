import React from "react";

function Items(props) {
  const { value, dispatch } = props;
  function handleAddContent(e) {
    if (e.key === "Enter") {
      dispatch({ type: "addContent", value: e.target.value });
      e.target.value = '';
    }
  }

  const contents = value.map((item, index) => (
    <div key={index}>
      <input
        type="text"
        value={item}
        onChange={e =>
          dispatch({
            type: "changeContent",
            value: e.target.value,
            index: e.target.name
          })
        }
        name={index}
      />
      <input
        type="button"
        value="删除"
        onClick={e =>
          dispatch({ type: "delelteContent", index: e.target.namex })
        }
        name={index}
      />
      <br />
    </div>
  ));

  return (
    <div>
      <input type="text" placeholder="添加内容" onKeyDown={handleAddContent} />
      <div>{contents}</div>
    </div>
  );
}

export default Items;
