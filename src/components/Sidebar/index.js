import React from "react";
import Items from "../Items/index";
import Colors from "../Colors/index";
import Palette from "../Palette/index";

import {
  Drawer,
  Form,
  Input,
  Button,
  Radio,
  Upload,
  Icon,
  Select,
  Row,
  Col,
  Tabs
} from "antd";
import "antd/dist/antd.css";
const { TabPane } = Tabs;
function DrawerForm(props) {
  const {
    windowSize,
    editMode,
    canvasState,
    dispatch,
    loading,
    fonts,
    poster
  } = props;

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
      mask={false}
    >
      <Tabs defaultActiveKey="1" onChange={() => {}} type="card">
        <TabPane tab="文字" key="1">
          <Form>
            <Form.Item label="标题">
              <Input
                type="text"
                value={canvasState.title}
                onChange={e =>
                  dispatch({
                    type: "change",
                    key: "title",
                    value: e.target.value
                  })
                }
                allowClear
              />
            </Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item label="标题字体">
                  <Select
                    value={canvasState.fontFamily}
                    style={{ fontFamily: canvasState.fontFamily }}
                    onChange={value =>
                      dispatch({
                        type: "change",
                        key: "fontFamily",
                        value: value
                      })
                    }
                  >
                    <Select.OptGroup label="所有语言">
                      {fonts.all.map((item, index) => (
                        <Select.Option
                          key={index}
                          value={item.en}
                          style={{ fontFamily: item.en }}
                        >
                          {item.ch}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                    <Select.OptGroup label="英语">
                      {fonts.en.map((item, index) => (
                        <Select.Option
                          key={index}
                          value={item.en}
                          style={{ fontFamily: item.en }}
                        >
                          {item.ch}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
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
              </Col>
            </Row>
            <Form.Item label="内容">
              <Items value={canvasState.contents} dispatch={dispatch} />
            </Form.Item>

            <Row gutter={8}>
              <Col span={16}>
                <Form.Item label="内容字体">
                  <Select
                    value={canvasState.contentFontFamily}
                    style={{ fontFamily: canvasState.contentFontFamily }}
                    onChange={value =>
                      dispatch({
                        type: "change",
                        key: "contentFontFamily",
                        value
                      })
                    }
                  >
                    <Select.OptGroup label="所有语言">
                      {fonts.all.map((item, index) => (
                        <Select.Option
                          key={index}
                          value={item.en}
                          style={{ fontFamily: item.en }}
                        >
                          {item.ch}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                    <Select.OptGroup label="英语">
                      {fonts.en.map((item, index) => (
                        <Select.Option
                          key={index}
                          value={item.en}
                          style={{ fontFamily: item.en }}
                        >
                          {item.ch}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
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
              </Col>
            </Row>
            <Form.Item label="布局">
              <Radio.Group
                defaultValue={canvasState.layout}
                buttonStyle="solid"
                onChange={e =>
                  dispatch({
                    type: "change",
                    key: "layout",
                    value: e.target.value
                  })
                }
              >
                <Radio.Button value="left">左边</Radio.Button>
                <Radio.Button value="middle">中间</Radio.Button>
                <Radio.Button value="right">右边</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="背景" key="2">
          <Form>
            <Form.Item label="模式">
              <Radio.Group
                defaultValue={canvasState.mode}
                buttonStyle="solid"
                onChange={e =>
                  dispatch({
                    type: "change",
                    key: "mode",
                    value: e.target.value
                  })
                }
              >
                <Radio.Button value="image">图片</Radio.Button>
                <Radio.Button value="color">颜色</Radio.Button>
                <Radio.Button value="blend">混合</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {canvasState.mode === "blend" && (
              <Form.Item label="种类">
                <Radio.Group
                  defaultValue={canvasState.blendType}
                  buttonStyle="solid"
                  onChange={e =>
                    dispatch({
                      type: "change",
                      key: "blendType",
                      value: e.target.value
                    })
                  }
                >
                  <Radio.Button value="left">左边</Radio.Button>
                  <Radio.Button value="right">右边</Radio.Button>
                </Radio.Group>
              </Form.Item>
            )}
            {canvasState.mode != "color" && (
              <Form.Item label="壁纸">
                <Upload
                  accept="image/*"
                  onChange={handleImageChange}
                  showUploadList={false}
                  customRequest={() => {}}
                >
                  <Button>
                    <Icon type="upload" /> 上传图片
                  </Button>
                </Upload>
              </Form.Item>
            )}
            {canvasState.mode != "image" && (
              <Form.Item label="颜色">
                <Colors colors={canvasState.colors} dispatch={dispatch} />
              </Form.Item>
            )}
          </Form>
          {/* <Palette/> */}
        </TabPane>
        <TabPane tab="说明" key="3">
          这里将有一些使用说明
        </TabPane>
      </Tabs>
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
