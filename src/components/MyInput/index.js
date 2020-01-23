import { Input, Tabs, Row, Col, Button } from "antd";
import { useState } from "react";
const { TabPane } = Tabs;

export default function({ onSelect, examples = [], ...rest }) {
  const [showExmaple, setShowExample] = useState(false);
  return (
    <div>
      <Input {...rest} onFocus={() => setShowExample(true)} />
      {showExmaple && examples.length !== 0 && (
        <div
          style={{
            height: 300,
            width: "100%",
            position: "absolute",
            background: "white",
            zIndex: 10
          }}
        >
          <Tabs defaultActiveKey="1" size="small">
            {examples.map(item => (
              <TabPane tab={item.key} key={item.key}>
                <Row>
                  {item.list.map(i => (
                    <Col
                      span={8}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                      onClick={() => onSelect && onSelect(i)}
                    >
                      {i}
                    </Col>
                  ))}
                </Row>
              </TabPane>
            ))}
          </Tabs>
          <Button
            icon="close"
            shape="circle"
            onClick={() => setShowExample(false)}
          />
        </div>
      )}
    </div>
  );
}
