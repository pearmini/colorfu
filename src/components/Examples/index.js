import React from "react";
import { Drawer } from "antd";
export default function(props) {
  const { showExamples, images, switchExample } = props;

  return (
    <Drawer
      title="案例"
      placement="bottom"
      closable={true}
      onClose={e => showExamples.setFalse()}
      visible={showExamples.value}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {images.map((item, index) => (
          <img
            src={item}
            height={150}
            style={{ marginLeft: 10, margnRight: 10 }}
            onClick={e => {
              switchExample(index);
              showExamples.setFalse();
            }}
          />
        ))}
      </div>
    </Drawer>
  );
}
