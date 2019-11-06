import React from "react";
import fonts from "../../lib/fonts";
import Items from "../Items/index";

export default function(props) {
  const { windowSize, editMode, params, poster } = props;
  const panelStyle = {
    position: "absolute",
    width: windowSize.width / 4,
    height: windowSize.height,
    background: "#f0f0f0"
  };

  const buttonStyle = {
    position: "absolute"
  };

  function handleDowloadImage(e) {
    poster.canvasToPng("wallpaper.png");
  }

  const panel = (
    <div style={panelStyle}>
      <h1>DIY</h1>
      <div>
        标题：
        <input type="text" {...params.title} />
        <br />
        内容:
        <Items {...params.contents} />
        <br />
        标题字体颜色：
        <input type="color" {...params.textColor} />
        <br />
        内容字体颜色：
        <input type="color" {...params.contentTextColor} />
        <br />
        <input
          type="file"
          onChange={params.imageURL.onChange}
          accept="image/*"
          id="imageInput"
        />
        <br />
        位置：
        <label>
          <input
            type="radio"
            value="left"
            name="layout"
            onChange={params.layout.onChange}
          />
          左边
        </label>
        <label>
          <input
            type="radio"
            value="middle"
            name="layout"
            onChange={params.layout.onChange}
          />
          中间
        </label>
        <label>
          <input
            type="radio"
            value="right"
            name="layout"
            onChange={params.layout.onChange}
          />
          右边
        </label>
        <br />
        主标题字体
        <select {...params.fontFamily}>
          {fonts.map((item, index) => (
            <option key={index}>{item.en}</option>
          ))}
        </select>
        <br />
        内容字体
        <select {...params.contentFontFamily}>
          {fonts.map((item, index) => (
            <option key={index}>{item.en}</option>
          ))}
        </select>
      </div>
      <button onClick={handleDowloadImage}>保存到本地</button>
    </div>
  );

  const button = (
    <div style={buttonStyle}>
      <button onClick={editMode.setTrue}>编辑</button>
    </div>
  );

  return <div>{editMode.value ? panel : button}</div>;
}
