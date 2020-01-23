import { Input, Slider, Radio, Button } from "antd";
import MyInput from "../MyInput/index";
import { connect } from "dva";
function Editor({ value, changeValue, swapColor, wordsExamples }) {
  return (
    <div>
      <div>
        Text
        <MyInput
          type="text"
          value={value.title}
          onChange={e => changeValue("title", e.target.value)}
          examples={wordsExamples}
          onSelect={value => changeValue("title", value)}
        />
        字体大小
        <Slider
          defaultValue={value.fontSize}
          min={100}
          max={700}
          onChange={value => changeValue("fontSize", value)}
        />
        字体排列方式
        <div>
          <Radio.Group
            value={value.mode}
            buttonStyle="solid"
            onChange={e => changeValue("mode", e.target.value)}
          >
            <Radio.Button value="h">水平</Radio.Button>
            <Radio.Button value="v">竖直</Radio.Button>
          </Radio.Group>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column"
          }}
        >
          <div>
            字体颜色
            <Input
              type="color"
              value={value.color}
              onChange={e => changeValue("color", e.target.value)}
            />
          </div>
          <Button
            icon="swap"
            type="primary"
            shape="circle"
            onClick={() => swapColor()}
          />
          <div>
            背景颜色
            <Input
              type="color"
              value={value.backgroundColor}
              onChange={e => changeValue("backgroundColor", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default connect(
  ({ example, words }) => ({ value: example.value, wordsExamples: words }),
  {
    changeValue: (type, value) => ({
      type: "example/changeValue",
      payload: { type, value }
    }),
    swapColor: () => ({ type: "example/swapColor" })
  }
)(Editor);
