import React, {useState} from "react";
import "antd/dist/antd.css";
import { Button, Row, Col, Input } from "antd";

function Colors(props) {
  const { colors, dispatch} = props;
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const contents = colors.map((item, index) => (
    <Row key={index} gutter={8}>
      <Col span={20}>
        <Input
          type="color"
          value={item.value}
          onChange={e =>
            dispatch({
              type: "changeColor",
              value: e.target.value,
              index: e.target.name
            })
          }
          name={index}
        />
      </Col>
      <Col span={4}>
        <Button
          onClick={e => dispatch({ type: "deleteColor", index: e.target.name })}
          name={index}
          icon="delete"
        />
      </Col>
    </Row>
  ));

  return (
    <div>
      <Row gutter={8}>
        <Col span={16}>
          <Input type="color" value={currentColor} onChange={e => setCurrentColor(e.target.value)}/>
        </Col>
        <Col span={8}>
          <Button
            onClick={e => {
              dispatch({ type: "addColor", color: currentColor});
            }}
          >
            添加
          </Button>
        </Col>
      </Row>

      <div>{contents}</div>
    </div>
  );
}

export default Colors;
