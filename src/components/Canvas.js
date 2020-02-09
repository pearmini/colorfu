import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import * as d3 from "d3-scale";

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
  const [from, setFrom] = useState({ x: 0, y: 0, scale: 1 });
  const { width, height } = useWindowSize();
  const ref = useRef(null);

  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([from.x, to.x]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([from.y, to.y]);

  const scaleScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([from.scale, to.scale]);

  const widthScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([from.width, to.width]);
  const heightScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([from.height, to.height]);

  const current = {
    x: xScale(progress),
    y: yScale(progress),
    scale: scaleScale(progress),
    width: widthScale(progress),
    height: heightScale(progress)
  };

  useEffect(() => {
    const box = ref.current;
    const { x: centerX, y: centerY } = box.getBoundingClientRect();
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
