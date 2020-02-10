import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import getAbsolutePostion from "../utils/getAbsolutePosition";
import map from "../utils/map";

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div.attrs(props => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px) scale(${props.scale})`
  }
}))`
  position: absolute;
  /* 相对与父亲的宽高，translate(50%, 50%) 是相对于自己的宽高 */
  left: 50%;
  top: 50%;
`;

function Canvas({ from: start, to, progress = 0, children, ...rest }) {
  // 这里的初始化的 x 和 y 必须是零（默认没有发生平移）。
  // 否者影响下面的 centerX 和 centerY 的计算。
  const [from, setFrom] = useState({ ...start, x: 0, y: 0 });
  const { width, height } = useWindowSize();
  const ref = useRef(null);
  const current = Object.keys(from).reduce(
    (obj, key) => ({
      ...obj,
      [key]: map(progress, 0, 1, from[key], to[key])
    }),
    {}
  );

  useEffect(() => {
    const element = ref.current;
    // 这里的绝对定位只能通过 offsetTop 和 offsetLeft 获得
    // 用 getBoundingClientRect + scroll 的距离会出现问题
    // 改变窗口大小的时候会出现缩小的问题是正常的现象
    const { left: centerX, top: centerY } = getAbsolutePostion(element);
    setFrom({ ...start, x: start.x - centerX, y: start.y - centerY });
  }, [width, height]);

  return (
    <Wrapper {...rest}>
      <Container ref={ref} {...current}>
        {React.cloneElement(children, {
          width: current.width,
          height: current.height
        })}
      </Container>
    </Wrapper>
  );
}

export default Canvas;
