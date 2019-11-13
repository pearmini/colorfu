import React from "react";
import fonts from "../../lib/fonts";
import Items from "../Items/index";
import { Drawer } from "antd";
import { Select } from "antd";
import { Form, Input, Button } from "antd";
import { Radio, Upload, Icon } from "antd";
import "antd/dist/antd.css";

function DrawerForm(props) {
  const { windowSize, editMode, canvasState, dispatch, loading } = props;
  const panelStyle = {
    position: "absolute",
    width: windowSize.width / 4,
    height: windowSize.height,
    background: "#f0f0f0"
  };

  const buttonStyle = {
    position: "absolute",
    left: 10,
    top: 10
  };

  function handleImageChange(data) {
    const file = data.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageURL = reader.result;
      dispatch({ type: "changeImage", imageURL });
    };
  }

  // const panel = (
  //   <div style={panelStyle}>
  //     <h1>DIY</h1>
  //     <div>
  //       标题：
  //       <input
  //         type="text"
  //         value={canvasState.title}
  //         onChange={e =>
  //           dispatch({ type: "change", key: "title", value: e.target.value })
  //         }
  //       />
  //       <br />
  //       内容:
  //       <Items value={canvasState.contents} dispatch={dispatch} />
  //       <br />
  //       标题字体颜色：
  //       <input
  //         type="color"
  //         value={canvasState.textColor}
  //         onChange={e =>
  //           dispatch({
  //             type: "change",
  //             key: "textColor",
  //             value: e.target.value
  //           })
  //         }
  //       />
  //       <br />
  //       内容字体颜色：
  //       <input
  //         type="color"
  //         value={canvasState.contentTextColor}
  //         onChange={e =>
  //           dispatch({
  //             type: "change",
  //             key: "contentTextColor",
  //             value: e.target.value
  //           })
  //         }
  //       />
  //       <br />
  //       <input
  //         type="file"
  //         onChange={handleImageChange}
  //         accept="image/*"
  //         id="imageInput"
  //       />
  //       <br />
  //       位置：
  //       <label>
  //         <input
  //           type="radio"
  //           value="left"
  //           name="layout"
  //           onChange={e =>
  //             dispatch({ type: "change", key: "layout", value: e.target.value })
  //           }
  //         />
  //         左边
  //       </label>
  //       <label>
  //         <input
  //           type="radio"
  //           value="middle"
  //           name="layout"
  //           onChange={e =>
  //             dispatch({ type: "change", key: "layout", value: e.target.value })
  //           }
  //         />
  //         中间
  //       </label>
  //       <label>
  //         <input
  //           type="radio"
  //           value="right"
  //           name="layout"
  //           onChange={e =>
  //             dispatch({ type: "change", key: "layout", value: e.target.value })
  //           }
  //         />
  //         右边
  //       </label>
  //       <br />
  //       主标题字体
  //       <select
  //         value={canvasState.fontFamily}
  //         onChange={e =>
  //           dispatch({
  //             type: "change",
  //             key: "fontFamily",
  //             value: e.target.value
  //           })
  //         }
  //       >
  //         {fonts.map((item, index) => (
  //           <option key={index} value={item.en}>
  //             {item.ch}
  //           </option>
  //         ))}
  //       </select>
  //       <br />
  //       内容字体
  //       <select
  //         value={canvasState.contentFontFamily}
  //         onChange={e =>
  //           dispatch({
  //             type: "change",
  //             key: "contentFontFamily",
  //             value: e.target.value
  //           })
  //         }
  //       >
  //         {fonts.map((item, index) => (
  //           <option key={index} value={item.en}>
  //             {item.ch}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //   </div>
  // );

  const panel = (
    <Drawer
      title="DIY Your Wordspaper"
      placement="left"
      closable={true}
      onClose={() => editMode.setFalse()}
      visible={editMode.value}
      getContainer={false}
      style={{ position: "absolute" }}
      width={windowSize.width * 0.2 > 256 ? windowSize.width * 0.2 : 256}
    >
      <Form layout="vertical" hideRequiredMark>
        <Form.Item label="标题">
          <Input
            type="text"
            value={canvasState.title}
            onChange={e =>
              dispatch({ type: "change", key: "title", value: e.target.value })
            }
            allowClear
          />
        </Form.Item>
        {/* <Items value={canvasState.contents} dispatch={dispatch} /> */}
        <Form.Item label="标题字体">
          <Select
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
              <Select.Option key={index} value={item.en}>
                {item.ch}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="标题颜色">
          <Input
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
        </Form.Item>
        <Form.Item label="内容字体">
          <Select
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
              <Select.Option key={index} value={item.en}>
                {item.ch}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="内容字体颜色">
          <Input
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
        </Form.Item>
        <Form.Item label="布局">
          <Radio.Group
            defaultValue={canvasState.layout}
            buttonStyle="solid"
            onChange={e =>
              dispatch({ type: "change", key: "layout", value: e.target.value })
            }
          >
            <Radio.Button value="left">左边</Radio.Button>
            <Radio.Button value="middle">中间</Radio.Button>
            <Radio.Button value="right">右边</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="壁纸">
          <Upload
            accept="image/*"
            onChange={handleImageChange}
            listType="picture"
          >
            <Button>
              <Icon type="upload" /> 上传图片
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  );
  const button = (
    <div style={buttonStyle}>
      <Button
        shape="circle"
        icon="edit"
        ghost
        onClick={() => {
          editMode.setTrue();
        }}
      />
    </div>
  );

  return (
    <div>{!loading.value && <div>{editMode.value ? panel : button}</div>}</div>
  );
}

export default DrawerForm;
