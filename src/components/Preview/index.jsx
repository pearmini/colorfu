import WordsPaper from "../WordsPaper/index";
import { Button } from "antd";
import { connect } from "dva";
import html2canvas from "html2canvas";
function Preview({ showPreview, hidePreview, value }) {
  async function download() {
    const wordspaper = document.getElementById("preview-wordspaper");
    const canvas = await html2canvas(wordspaper);
    const filename = "text.png";
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
    });
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 3,
        display: !showPreview && "none"
      }}
    >
      <WordsPaper
        id="preview-wordspaper"
        {...value}
        width="100%"
        height="100%"
      />
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 30,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            marginRight: 50,
            background: "white",
            width: 100,
            height: 50,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 10
          }}
        >
          <Button
            type="primary"
            onClick={() => download()}
            icon="check"
            shape="circle"
          />
          <Button
            type="danger"
            onClick={() => hidePreview()}
            icon="close"
            shape="circle"
          />
        </div>
      </div>
    </div>
  );
}

export default connect(
  ({ control, example }) => ({
    showPreview: control.showPreview,
    value: example
  }),
  {
    hidePreview: () => ({ type: "control/hidePreview" })
  }
)(Preview);
