import React, { useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { Slider } from "antd";

function Colors(props) {
  const { colors, dispatch } = props;
  const [currentColor, setCurrentColor] = useState("#ffffff");

  let sum = 0;
  const ranges = colors.map((item, index) => {
    const start = sum,
      end = sum + item.weight;
    sum += item.weight;
    return [start * 100, end * 100];
  });

  console.log(ranges[1][0])
  const contents = colors.map((item, index) => (
    <Row key={index} gutter={8}>
      <Col span={6}>
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
      <Col span={14}>
        <Slider
          key={index}
          range
          defaultValue={[ranges[index][0], ranges[index][1]]}
          onChange={
            e => console.log(e)
            // e => dispatch({type: "changeColorRange", index, range: e})
          }
        />
      </Col>
    </Row>
  ));

  return (
    <div>
      <Row gutter={8}>
        <Col span={16}>
          <Input
            type="color"
            value={currentColor}
            onChange={e => setCurrentColor(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Button
            onClick={e => {
              dispatch({ type: "addColor", color: currentColor });
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
