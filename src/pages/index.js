import styled from "styled-components";
import { useWindowSize, useWindowScroll } from "react-use";
import { Button } from "antd";
import Hardware from "../components/Harware";
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
  margin-top: 150px;
  display: flex;
  align-items: flex-end;
`;

const StyledHardWare = styled(Hardware)`
  position: absolute;
  transform: translate(-50%, -50%);
`;

const IpadCanvas = styled(Canvas)`
  margin-right: 50px;
  z-index: 5;
`;

const MacbookCanvas = styled(Canvas)`
  z-index: 2;
`;

const IphoneCanvas = styled(Canvas)`
  margin-right: 70px;
  z-index: 5;
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
        x: -50,
        y: -50,
        scale: 0.5,
        width: height * 1.8,
        height
      },
      progress: Math.min(1, y / fixedHeight)
    },
    ipad: {
      content: {
        title: "Mamba Forever",
        backgroundColor: "#FCBC24",
        color: "#542483",
        fontSize: 120
      },
      from: {
        x: -250,
        y: 0,
        scale: 0.4,
        width: 1024,
        height: 768
      },
      to: {
        x: 270,
        y: 200,
        scale: 0.45,
        width: 1024,
        height: 768
      },
      progress: Math.min(1, y / fixedHeight)
    },
    iphone: {
      content: {
        title: "武汉加油",
        backgroundColor: "#9399ff",
        color: "white",
        fontSize: 100,
        mode: "v"
      },
      from: { x: -250, y: 0, scale: 0.3, width: 962 * 0.35, height: 1918 * 0.35 },
      to: { x: 270, y: 200, scale: 0.4, width: 962 * 0.35, height: 1918 * 0.35 },
      progress: Math.min(1, y / fixedHeight)
    }
  };

  const { macbook, iphone, ipad } = props;
  return (
    <Container>
      <Window {...windowProps}>
        {/* <Title>Words In Color</Title>
        <SubTitle>
          A tool to create unique wallpaper or use it as a special gift.
        </SubTitle>
        <Button type="primary">Create</Button> */}
        <Row>
          <IpadCanvas from={ipad.from} to={ipad.to} progress={ipad.progress}>
            {({ width, height, scale }) => (
              <StyledHardWare type="ipad" width={width} height={height}>
                {(width, height) => (
                  <WordsInColor
                    {...{ width, height }}
                    {...ipad.content}
                    scale={scale}
                  />
                )}
              </StyledHardWare>
            )}
          </IpadCanvas>
          <IphoneCanvas
            from={iphone.from}
            to={iphone.to}
            progress={iphone.progress}
          >
            {({ width, height, scale }) => (
              <StyledHardWare type="iphone" width={width} height={height}>
                {(width, height) => (
                  <WordsInColor
                    {...{ width, height }}
                    {...iphone.content}
                    scale={scale}
                  />
                )}
              </StyledHardWare>
            )}
          </IphoneCanvas>
          <MacbookCanvas
            from={macbook.from}
            to={macbook.to}
            progress={macbook.progress}
          >
            {({ width, height, scale }) => (
              <StyledHardWare type="imac" width={width} height={height}>
                {(width, height) => (
                  <WordsInColor
                    {...{ width, height }}
                    {...macbook.content}
                    scale={scale}
                  />
                )}
              </StyledHardWare>
            )}
          </MacbookCanvas>
        </Row>
      </Window>
    </Container>
  );
}

export default Index;
