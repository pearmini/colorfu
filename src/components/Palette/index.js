import React from "react";
import { Popover } from "antd";

export default function(props) {
  const content = <div>选择颜色</div>;
  return (
    <Popover content={content} title="Title">
      <div>展示颜色</div>
    </Popover>
  );
}
