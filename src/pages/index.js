import styled from "styled-components";
import { useWindowSize, useWindowScroll } from "react-use";
import { Button } from "antd";
import MacBook from "../components/MacBook";
import WordsInColor from "../components/WordsInColor";
import Canvas from "../components/Canvas";

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

const StyledCanvas = styled(Canvas)`
  width: 300px;
  height: 500px;
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
        <StyledCanvas
          from={{ x: width / 2, y: height / 2, scale: 1, width, height }}
          to={{
            x: 0,
            y: 0,
            scale: 0.4,
            width: height * 1.6,
            height
          }}
          progress={y > 200 ? 1 : y / 200}
        >
          <StyledMacBook>
            {(width, height) => (
              <WordsInColor {...{ width, height }} {...wordsProps} />
            )}
          </StyledMacBook>
        </StyledCanvas>
      </Window>
    </Container>
  );
}

export default Index;
