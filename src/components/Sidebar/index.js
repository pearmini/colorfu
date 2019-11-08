import React from "react";
import fonts from "../../lib/fonts";
import Items from "../Items/index";

export default function(props) {
  const { windowSize, editMode, canvasState, poster, dispatch } = props;
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

  function handleImageChange() {
    const file = document.getElementById("imageInput").files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageURL = e.target.result;
      dispatch({ type: "changeImage", imageURL });
    };
    reader.readAsDataURL(file);
  }

  const panel = (
    <div style={panelStyle}>
      <h1>DIY</h1>
      <div>
        标题：
        <input
          type="text"
          value={canvasState.title}
          onChange={e =>
            dispatch({ type: "change", key: "title", value: e.target.value })
          }
        />
        <br />
        内容:
        <Items value={canvasState.contents} dispatch={dispatch} />
        <br />
        标题字体颜色：
        <input
          type="color"
          value={canvasState.textColor}
          onChange={e =>
            dispatch({
              type: "change",
              key: "textColor",
              value: e.target.value
            })
          }
        />
        <br />
        内容字体颜色：
        <input
          type="color"
          value={canvasState.contentTextColor}
          onChange={e =>
            dispatch({
              type: "change",
              key: "contentTextColor",
              value: e.target.value
            })
          }
        />
        <br />
        <input
          type="file"
          onChange={handleImageChange}
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
            onChange={e =>
              dispatch({ type: "change", key: "layout", value: e.target.value })
            }
          />
          左边
        </label>
        <label>
          <input
            type="radio"
            value="middle"
            name="layout"
            onChange={e =>
              dispatch({ type: "change", key: "layout", value: e.target.value })
            }
          />
          中间
        </label>
        <label>
          <input
            type="radio"
            value="right"
            name="layout"
            onChange={e =>
              dispatch({ type: "change", key: "layout", value: e.target.value })
            }
          />
          右边
        </label>
        <br />
        主标题字体
        <select
          value={canvasState.fontFamily}
          onChange={e =>
            dispatch({
              type: "change",
              key: "fontFamily",
              value: e.target.value
            })
          }
        >
          {fonts.map((item, index) => (
            <option key={index}>{item.en}</option>
          ))}
        </select>
        <br />
        内容字体
        <select
          value={canvasState.contentFontFamily}
          onChange={e =>
            dispatch({
              type: "change",
              key: "contentFontFamily",
              value: e.target.value
            })
          }
        >
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
