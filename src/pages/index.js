import styled from "styled-components";
import { useWindowSize, useWindowScroll } from "react-use";
import { Button } from "antd";
import MacBook from "../components/MacBook";
import WordsInColor from "../components/WordsInColor";
import Canvas from "../components/Canvas";

const Container = styled.div`
  height: 2000px;
`;

const Window = styled.div.attrs(({ y, fixedHeight, marginTop }) => ({
  style: {
    position: y < fixedHeight ? "fixed" : "static",
    marginTop: y < fixedHeight ? marginTop : marginTop + fixedHeight
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

const Row = styled.section`
  margin-top: 50px;
  display: flex;
  align-items: flex-end;
`;

const StyledMacBook = styled(MacBook).attrs(props => ({
  style: {
    transform: `translate(-50%, -50%)`
  }
}))`
  position: absolute;
`;

function Index() {
  const { width, height } = useWindowSize();
  const { y } = useWindowScroll();
  const fixedHeight = 200;
  const windowProps = {
    y,
    fixedHeight,
    marginTop: 100
  };

  const props = {
    macbook: {
      content: {
        title: "♞ell⦿ 2☯︎2零",
        backgroundColor: "#fd5e53",
        color: "white",
        fontSize: 250
      },
      from: { x: width / 2, y: height / 2, scale: 1, width, height },
      to: {
        x: 0,
        y: 0,
        scale: 0.4,
        width: height * 1.6,
        height
      },
      progress: Math.min(1, y / fixedHeight)
    },
    iphone: {},
    ipad: {}
  };

  const { macbook, iphone, ipad } = props;
  return (
    <Container>
      <Window {...windowProps}>
        <Title>Words In Color</Title>
        <SubTitle>
          A tool to create unique wallpaper or use it as a special gift.
        </SubTitle>
        <Button type="primary">Create</Button>
        <Row>
          <Canvas
            from={macbook.from}
            to={macbook.to}
            progress={macbook.progress}
          >
            {({ width, height, scale }) => (
              <StyledMacBook width={width} height={height}>
                {(width, height) => (
                  <WordsInColor
                    {...{ width, height }}
                    {...macbook.content}
                    scale={scale}
                  />
                )}
              </StyledMacBook>
            )}
          </Canvas>
        </Row>
      </Window>
    </Container>
  );
}

export default Index;
