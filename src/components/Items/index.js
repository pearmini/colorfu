import React from "react";

function Items(props) {
  const { contents, onAddContent, handleContentChange, handleDeleteContent} = props;
  function handleEnter(e) {
    if (e.key === "Enter") {
      onAddContent(e);
    }
  }

  function handleChange(e){
    handleContentChange(e);
  }

  const items = contents.map((item, index) => (
    <div key={index}>
      <input type="text" value={item} onChange={handleChange} name={index}/>
      <input type="button" name={index} value="删除" onClick={handleDeleteContent}/>
      <br />
    </div>
  ));
  return (
    <div>
      <input type="text" placeholder="添加内容" onKeyDown={handleEnter} />
      <div>{items}</div>
    </div>
  );
}

export default Items;
