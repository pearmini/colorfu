import React, { useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { pie, arc} from "d3";

function Colors(props) {
  const { colors, dispatch } = props;
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

  const pieLayout = pie().value(d => d.weight);
  const arcs = pieLayout(colors);
  const pathGenerator = arc()
          .innerRadius(0)
          .outerRadius(70);
  
  const piechart = (
    <svg width={200} height={200}>
      <g>
        {arcs.map((d, index) => (
          <g key={index} transform={`translate(${100}, ${100})`}>
            <path d={pathGenerator(d)} fill={d.data.value}/>
          </g>
        ))}
      </g>
    </svg>
  );

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

      {/* <div>{contents}</div> */}
      <div>{piechart}</div>
    </div>
  );
}

export default Colors;
