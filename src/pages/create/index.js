import styles from "./index.css";
import { Row, Col, Button } from "antd";
import Editor from "../../components/Editor";
import Emulator from "../../components/Emulator";
import Preview from "../../components/Preview";
import { connect } from "dva";

function Create({ displayPreview }) {
  return (
    <div style={{ marginTop: 56, background: "#f9f9f9" }}>
      <Row>
        <Col span={4}>
          <Editor />
        </Col>
        <Col span={20}>
          <Emulator />
          <Button onClick={() => displayPreview()}>下载</Button>
        </Col>
      </Row>
      <Preview />
    </div>
  );
}

export default connect(null, {
  displayPreview: () => ({ type: "control/displayPreview" })
})(Create);
