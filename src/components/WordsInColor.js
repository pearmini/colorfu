import styled from "styled-components";
import { useEffect, useRef } from "react";
const Contianer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-family: "Righteous";
  white-space: nowrap;
  font-weight: bold;
`;

function WordsInColor({ title, mode, scale = 1, ...style }) {
  const ref = useRef(null);
  const { width: contentWidth, height: contentHeight, fontSize } = style;

  // clear transform style in order to compute the right textWidth and textHeight
  if (ref.current) {
    ref.current.style.transform = "";
  }

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
    element.style.transform = scalelist.join(" ");
  }, [title, fontSize, contentWidth, contentHeight]);

  return (
    <Contianer style={style}>
      <Text ref={ref}>{title}</Text>
    </Contianer>
  );
}

export default WordsInColor;
