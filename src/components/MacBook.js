import styled from "styled-components";
import useBorder from "../utils/useBorder";

const Container = styled.div.attrs(props => ({
  /* 防止添加过多的的类 */
  style: {
    // 将屏幕的中心成为该容器的中心
    marginTop: (props.borderBottom - props.borderTop) / 2,
    width: props.width,
    height: props.height,
    borderTop: `${props.borderTop}px solid transparent`,
    borderRight: `${props.borderRight}px solid transparent`,
    borderLeft: `${props.borderLeft}px solid transparent`,
    borderBottom: `${props.borderBottom}px solid transparent`,
    borderImage: `url(${props.imageURL}) ${props.top} ${props.right} ${props.bottom} ${props.left}`
  }
}))`
  box-sizing: content-box;
  /* border:10px solid black; */
`;

function MacBook({ height, width, children, ...rest }) {
  const border = useBorder({
    height,
    width
  });
  const imageURL = "https://i.loli.net/2020/01/31/vZhQugfd5iVMIDO.jpg";
  const { width: contentWidth, height: contentHeight } = border;
  return (
    <Container {...border} imageURL={imageURL} {...rest}>
      {children && children(contentWidth, contentHeight)}
    </Container>
  );
}

export default MacBook;
