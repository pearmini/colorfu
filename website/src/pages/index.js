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

const Dashbord = styled.div`
  margin-top: 150px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
`;

const StyledHardWare = styled(Hardware)`
  position: absolute;
  transform: translate(-50%, -50%);
`;

const IpadCanvas = styled(Canvas)`
  /* margin-right: 50px; */
  z-index: 5;
`;

const MacbookCanvas = styled(Canvas)`
  z-index: 2;
`;

const IphoneCanvas = styled(Canvas)`
  /* margin-right: 70px; */
  z-index: 5;
`;

function Index() {
  // ipad pro：2224 x 1668
  // iphone 11: 414 x 896
  // imac：5120 x 2880  25
  const { width, height } = useWindowSize();
  const { y } = useWindowScroll();
  const fixedHeight = 200;
  const windowProps = {
    y,
    fixedHeight,
    marginTop: 100
  };

  const total = 2224 + 414 + 5120,
    totalRatio = 0.7,
    totalWidth = width * totalRatio,
    ipadWidth = (totalWidth * 2224) / total,
    ipadHeight = ipadWidth * (1668 / 2224),
    imacWidth = (totalWidth * 5120) / total,
    iphoneWidth = (totalWidth * 414) / total,
    iphoneHeight = iphoneWidth * (896 / 414);

  const props = {
    macbook: {
      content: {
        title: "♞ell⦿ 2☯︎2零",
        backgroundColor: "#fd5e53",
        color: "white",
        fontSize: 250
      },
      from: { x: width / 2, y: height / 2, width, height, scale: 1 },
      to: {
        x: 0,
        y: 0,
        width,
        height,
        scale: imacWidth / width
      },
      progress: Math.min(1, y / fixedHeight)
    },
    ipad: {
      content: {
        title: "Mamba Forever",
        backgroundColor: "#FCBC24",
        color: "#542483",
        fontSize: 40
      },
      from: {
        x: -250,
        y: 0,
        width: ipadWidth,
        height: ipadHeight,
        scale: 1
      },
      to: {
        x: 0,
        y: 0,
        width: ipadWidth,
        height: ipadHeight,
        scale: 1
      },
      progress: Math.min(1, y / fixedHeight)
    },
    iphone: {
      content: {
        title: "武汉加油",
        backgroundColor: "#9399ff",
        color: "white",
        fontSize: 25,
        mode: "v"
      },
      from: {
        x: -250,
        y: 0,
        width: iphoneWidth,
        height: iphoneHeight,
        scale: 1
      },
      to: {
        x: 0,
        y: 0,
        width: iphoneWidth,
        height: iphoneHeight,
        scale: 1
      },
      progress: Math.min(1, y / fixedHeight)
    }
  };

  const { macbook, iphone, ipad } = props;
  return (
    <Container>
      <Window {...windowProps}>
        <Dashbord>
          <Title>Words In Color</Title>
          <SubTitle>
            A tool to create unique wallpaper or use it as a special gift.
          </SubTitle>
        </Dashbord>
        <Button type="primary">Create</Button>
        <Row>
          <IpadCanvas from={ipad.from} to={ipad.to} progress={ipad.progress}>
            {({ width, height }) => (
              <StyledHardWare type="ipad" width={width} height={height}>
                {(width, height) => (
                  <WordsInColor {...{ width, height }} {...ipad.content} />
                )}
              </StyledHardWare>
            )}
          </IpadCanvas>
          <IphoneCanvas
            from={iphone.from}
            to={iphone.to}
            progress={iphone.progress}
          >
            {({ width, height }) => (
              <StyledHardWare type="iphone" width={width} height={height}>
                {(width, height) => (
                  <WordsInColor {...{ width, height }} {...iphone.content} />
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
