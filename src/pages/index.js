import styled from "styled-components";
import { useWindowSize, useWindowScroll } from "react-use";
import { useEffect, useState, useRef } from "react";
import MacBook from "../components/MacBook";
import * as d3 from "d3-scale";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${props => props.y + 100}px;
  height: 2000px;
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
  background: blue;
`;

const Wrapper = styled.div`
  position: absolute;
  background: red;
  height: inherit;
  width: inherit;
  transform: ${props =>
    `translate(50%, 50%) translate(${props.x}px, ${props.y}px)`};
`;
const StyledMacBook = styled(MacBook)`
  position: absolute;
  transform: ${props => `translate(-50%, -50%) scale(${props.s})`};
`;
const Content = styled.div`
  /* background: blue; */
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

function Index() {
  const { width, height } = useWindowSize();
  const { y } = useWindowScroll();
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  // const [scale, setScale] = useState(1);
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

  return (
    <Container y={Math.min(200, y)}>
      <Title>Words In Color</Title>
      <SubTitle>
        A tool to create unique wallpaper or use it as a special gift.
      </SubTitle>
      <Box>
        <Wrapper ref={ref} {...translate}>
          <StyledMacBook {...{ width, height }} s={Math.max(s, 0.4)}>
            {(width, height) => (
              <Content {...{ width, height}}  >
                hello
              </Content>
            )}
          </StyledMacBook>
        </Wrapper>
      </Box>
    </Container>
  );
}

export default Index;
