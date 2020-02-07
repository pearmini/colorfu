import styled from "styled-components";
import useBorder from "../utils/useBorder";

const Container = styled.div.attrs(props => ({
  /* 防止添加过的类 */
  style: {
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
`;

function MacBook({ height, width, children, className }) {
  const border = useBorder({
    height,
    width
  });
  const imageURL = "https://i.loli.net/2020/01/31/vZhQugfd5iVMIDO.jpg";
  const { width: contentWidth, height: contentHeight } = border;
  return (
    <Container {...border} imageURL={imageURL} className={className}>
      {children && children(contentWidth, contentHeight)}
    </Container>
  );
}

export default MacBook;
