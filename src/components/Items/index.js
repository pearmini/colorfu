import React from "react";

function Items(props) {
  const { value, onAdd, onDelete, onChange} = props;
  function handleAddContent(e) {
    if (e.key === "Enter") {
      onAdd(e);
    }
  }

  const contents = value.map((item, index) => (
    <div key={index}>
      <input type="text" value={item} onChange={onChange} name={index}/>
      <input type="button"  value="删除" onClick={onDelete} name={index}/>
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
