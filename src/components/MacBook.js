import styled from "styled-components";
import useBorder from "../utils/useBorder";
import macBookBorder from "../assets/images/mac.png";
import ipadBorder from "../assets/images/ipad.png";
import iphoneBorder from "../assets/images/iphone.png";

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
  background-image: linear-gradient(black, black);
  background-repeat: no-repeat;
  & * {
    /* border-radius: 30px; */
  }
`;

function MacBook({ height, width, children, type, ...rest }) {
  // 在图片中每条线到对应边的距离
  const macBook = {
    left: 145,
    right: 145,
    top: 45,
    bottom: 85,
    width: 1211,
    height: 707,
    ratio: 1.6
  };

  const ipad = {
    width: 520,
    height: 398,
    top: 17,
    left: 14,
    right: 14,
    bottom: 15
  };

  const iphone = {
    width: 357,
    hegiht: 714,
    top: 15,
    left: 20,
    right: 20,
    bottom: 15
  };

  const useMacBookBorder = useBorder(macBook);
  const border = useMacBookBorder({ height, width });
  const { width: contentWidth, height: contentHeight } = border;
  return (
    <Container {...border} imageURL={macBookBorder} {...rest}>
      {children && children(contentWidth, contentHeight)}
    </Container>
  );
}

export default MacBook;
