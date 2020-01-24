import { CustomPicker } from "react-color";
var { Saturation } = require("react-color/lib/components/common");
var { Hue } = require("react-color/lib/components/common");
var { EditableInput } = require("react-color/lib/components/common");
function NormalPicker({ onChange, rgb, hex, ...rest }) {
  function handleRgbChange(data, e) {
    onChange(
      {
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: "rgb"
      },
      e
    );
  }
  return (
    <div>
      <div
        style={{
          height: 100,
          width: "100%",
          position: "relative",
          backgroundColor: "red"
        }}
      >
        <Saturation onChange={onChange} hex={hex} {...rest} />
      </div>
      <div style={{ position: "relative", height: 10, marginTop: 10 }}>
        <Hue onChange={onChange} {...rest} />
      </div>
      <div>
        <EditableInput
          label="hex"
          value={hex.replace("#", "")}
          onChange={onChange}
        />
        <EditableInput label="r" value={rgb.r} onChange={handleRgbChange} />
        <EditableInput label="g" value={rgb.g} onChange={handleRgbChange} />
        <EditableInput label="b" value={rgb.b} onChange={handleRgbChange} />
      </div>
    </div>
  );
}

export default CustomPicker(NormalPicker);
