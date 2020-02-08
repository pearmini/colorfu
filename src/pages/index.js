import styled from "styled-components";
import { useWindowSize, useWindowScroll } from "react-use";
import { useEffect, useState, useRef } from "react";
import {Button} from "antd";
import MacBook from "../components/MacBook";
import WordsInColor from "../components/WordsInColor";
import * as d3 from "d3-scale";

const Container = styled.div`
  height: 2000px;
`;

const Window = styled.div.attrs(props => ({
  style: {
    position: props.y < 200 ? "fixed" : "static",
    marginTop: props.y < 200 ? 100 : 300
  }
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 5rem;
  margin-bottom: 0;
`;

const SubTitle = styled.h2``;

const Box = styled.div`
  position: relative;
  width: 300px;
  height: 500px;
  /* background: blue; */
`;

const Wrapper = styled.div.attrs(props => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`
  }
}))`
  position: absolute;
  /* 相对与父亲的宽高，translate(50%, 50%) 是相对于自己的宽高 */
  left: 50%;
  top: 50%;
`;

const StyledMacBook = styled(MacBook).attrs(props => ({
  style: {
    transform: `translate(-50%, -50%) scale(${props.s})`
  }
}))`
  position: absolute;
`;


function Index() {
  const { width, height } = useWindowSize();
  const { y } = useWindowScroll();
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  const scale = d3
    .scaleLinear()
    .domain([0, 200])
    .range([1, 0.4]);

  const scaleY = d3
    .scaleLinear()
    .domain([0, 200])
    .range([1, 0]);

  const s = scale(y);
  const ref = useRef(null);
  const macWidth = d3
    .scaleLinear()
    .domain([0, 200])
    .range([width, height * 1.6]);
  const translate = {
    x: position.x,
    y: Math.max(scaleY(y), 0) * position.y
  };

  useEffect(() => {
    const box = ref.current;
    const { x, y } = box.getBoundingClientRect();
    const translateX = width / 2 - x,
      translateY = height / 2 - y;
    setPosition({
      x: translateX,
      y: translateY
    });
  }, [width, height]);

  const wordsProps = {
    title: "♞ell⦿ 2☯︎2零",
    backgroundColor: "#fd5e53",
    color: "white",
    fontSize: 250
  };

  return (
    <Container>
      <Window y={y}>
        <Title>Words In Color</Title>
        <SubTitle>
          A tool to create unique wallpaper or use it as a special gift.
        </SubTitle>
        <Button type="primary">Create</Button>
        <Box>
          <Wrapper ref={ref} {...translate}>
            <StyledMacBook
              {...{ width: y > 200 ? height * 1.6 :macWidth(y), height }}
              s={Math.max(s, 0.4)}
            >
              {(width, height) => (
                <WordsInColor {...{ width, height }} {...wordsProps} />
              )}
            </StyledMacBook>
          </Wrapper>
        </Box>
      </Window>
    </Container>
  );
}

export default Index;
