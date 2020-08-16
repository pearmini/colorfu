import { Popover, Tabs, Row, Col, Input } from "antd";
import { useState } from "react";
import ImagePalette from "../ImagePalette/index";
import NormalPicker from "../NormalPicker/index";
const { TabPane } = Tabs;

export default function({
  examples = [],
  value,
  onChange,
  imageUrl,
  onImageChange: handleImageChange,
  placement
}) {
  const [show, setShow] = useState(false);
  const content = (
    <div
      style={{
        height: 400,
        width: 250
      }}
    >
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="色盘" key="1">
          <NormalPicker
            color={value}
            onChange={color => onChange(color.hex)}
          />
        </TabPane>
        <TabPane tab="图片" key="2">
          <ImagePalette
            onSelect={onChange}
            imageUrl={imageUrl}
            onChange={handleImageChange}
          />
        </TabPane>
        {examples.map(item => (
          <TabPane tab={item.key} key={item.key}>
            <Row>
              {item.list.map(i => (
                <Col
                  span={6}
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    height: 50,
                    backgroundColor: i
                  }}
                  onClick={() => onChange && onChange(i)}
                />
              ))}
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      visible={show}
      onVisibleChange={v => setShow(v)}
      autoAdjustOverflow={true}
      placement={placement}
    >
      <Input type="color" value={value} />
    </Popover>
  );
}
