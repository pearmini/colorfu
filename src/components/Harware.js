import styled from "styled-components";
import useBorder from "../utils/useBorder";
import macbookBorder from "../assets/images/mac.png";
import ipadBorder from "../assets/images/ipad.png";
import iphoneBorder from "../assets/images/iphone.png";
import imacBorder from "../assets/images/imac.png";

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
  & > * {
    border-radius: ${props => (props.type === "imac" ? 0 : 30)}px;
  }
`;

function Hardware({ height, width, children, type = "macbook", ...rest }) {
  // 在图片中每条线到对应边的距离
  const hardwares = {
    macbook: {
      borderImage: macbookBorder,
      borderProps: {
        left: 145,
        right: 145,
        top: 45,
        bottom: 85,
        width: 1211,
        height: 707,
        ratio: 1.6
      }
    },
    ipad: {
      borderImage: ipadBorder,
      borderProps: {
        width: 520,
        height: 398,
        top: 17,
        left: 17,
        right: 16,
        bottom: 15
      }
    },
    iphone: {
      borderImage: iphoneBorder,
      borderProps: {
        width: 357,
        height: 714,
        top: 35,
        left: 25,
        right: 25,
        bottom: 25
      }
    },
    imac: {
      borderImage: imacBorder,
      borderProps: {
        width: 2800,
        height: 2234,
        left: 122,
        right: 122,
        top: 122,
        bottom: 671
      }
    }
  };

  const hardware = hardwares[type];

  const useHardwareBorder = useBorder(hardware.borderProps);
  const border = useHardwareBorder({ height, width });
  console.log(border);

  const { width: contentWidth, height: contentHeight } = border;
  return (
    <Container
      {...border}
      imageURL={hardware.borderImage}
      {...rest}
      type={type}
    >
      {children && children(contentWidth, contentHeight)}
    </Container>
  );
}

export default Hardware;
