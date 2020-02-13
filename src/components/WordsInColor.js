import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useState } from "react";
const Contianer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Text = styled.div.attrs(props => ({
  style: {
    transform: props.transform
  }
}))`
  font-family: "Righteous";
  white-space: nowrap;
  font-weight: bold;
  writing-mode: ${props => props.mode === "v" && "tb-rl"};
`;

const TextBox = styled(Text)`
  position: absolute;
  opacity: 0;
  writing-mode: ${props => props.mode === "v" && "tb-rl"};
`;

function WordsInColor({ title, mode = "h", scale = 1, ...style }) {
  const ref = useRef(null);
  const { width: contentWidth, height: contentHeight, fontSize } = style;
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const element = ref.current;

    // 获得实际字体的大小
    const {
      width: textWidth,
      height: textHeight
    } = element.getBoundingClientRect();

    // 计算目标容器的大小
    const realWidth = contentWidth * scale;
    const realHeight = contentHeight * scale;
    const textContainerWidth = realWidth * 0.9;
    const textContainerHeight = realHeight * 0.9;

    // 判断是否需要缩放
    const scalelist = [];
    textWidth > textContainerWidth &&
      scalelist.push(`scaleX(${textContainerWidth / textWidth})`);
    textHeight > textContainerHeight &&
      scalelist.push(`scaleY(${textContainerHeight / textHeight})`);

    // 设置 style
    setTransform(scalelist.join(" "));
  }, [title, fontSize, contentWidth, contentHeight]);

  return (
    <Contianer style={style}>
      <Text transform={transform} mode={mode}>
        {title}
      </Text>
      <TextBox ref={ref} mode={mode}>{title}</TextBox>
    </Contianer>
  );
}

export default WordsInColor;
