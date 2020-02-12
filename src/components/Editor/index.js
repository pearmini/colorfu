import { Slider, Radio, Button } from "antd";
import MyInput from "../MyInput/index";
import ColorPicker from "../ColorPicker/index";
import { connect } from "dva";
function Editor({
  value,
  changeValue,
  swapColor,
  wordsExamples,
  colorsExamples,
  imageUrl,
  setImageUrl
}) {
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
            justifyContent: "space-around"
          }}
        >
          <div>
            字体颜色
            <ColorPicker
              value={value.color}
              onChange={value => changeValue("color", value)}
              examples={colorsExamples}
              imageUrl={imageUrl}
              onImageChange={setImageUrl}
              placement="bottomLeft"
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
            <ColorPicker
              value={value.backgroundColor}
              onChange={value => changeValue("backgroundColor", value)}
              imageUrl={imageUrl}
              onImageChange={setImageUrl}
              placement="bottomRight"
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default connect(
  ({ example, words, colors, control }) => ({
    value: example,
    wordsExamples: words,
    colorsExamples: colors,
    imageUrl: global.imageUrl
  }),
  {
    changeValue: (type, value) => ({
      type: "example/changeValue",
      payload: { type, value }
    }),
    swapColor: () => ({ type: "example/swapColor" }),
    setImageUrl: imageUrl => ({
      type: "control/setImageUrl",
      payload: { imageUrl }
    })
  }
)(Editor);
