import React from "react";
import "antd/dist/antd.css";
import { Button, Row, Col, Input } from "antd";

function Items(props) {
  const { value, dispatch } = props;
  function handleAddContent(e) {
    if (e.key === "Enter") {
      dispatch({ type: "addContent", value: e.target.value });
      e.target.value = "";
    }
  }

  const contents = value.map((item, index) => (
    <Row key={index} gutter={8}>
      <Col span={20}>
        <Input
          type="text"
          value={item}
          onChange={e =>
            dispatch({
              type: "changeContent",
              value: e.target.value,
              index: e.target.name
            })
          }
          name={index}
          allowClear
        />
      </Col>
      <Col span={4}>
        <Button
          onClick={e =>
            dispatch({ type: "deleteContent", index: e.target.name })
          }
          name={index}
          icon="delete"
        />
      </Col>
    </Row>
  ));

  return (
    <div>
      <Input type="text" placeholder="添加内容" onKeyDown={handleAddContent} />
      <div>{contents}</div>
    </div>
  );
}

export default Items;
