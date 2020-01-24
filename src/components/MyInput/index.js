import { Input, Tabs, Row, Col } from "antd";
import { useState, useEffect } from "react";
const { TabPane } = Tabs;

export default function({ onSelect, examples = [], ...rest }) {
  const [showExmaple, setShowExample] = useState(false);
  useEffect(() => {
    window.addEventListener("click", e => {
      const container = document.getElementById("my-input");
      let p = e.target.parentNode;
      while (p && p !== container) {
        p = p.parentNode;
      }
      if (p !== container) {
        setShowExample(false);
      }
    });
    return () => {
      window.removeEventListener("click", this);
    };
  });
  return (
    <div id="my-input">
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
                      key={i}
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
        </div>
      )}
    </div>
  );
}
