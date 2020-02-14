import styled from "styled-components";
import useBorder from "../utils/useBorder";
import macbookBorder from "../assets/images/mac.png";
import ipadBorder from "../assets/images/ipad.png";
import iphoneBorder from "../assets/images/iphone.png";
import imacBorder from "../assets/images/imac.png";

const Container = styled.div`
  position: relative;
`;

const Border = styled.img.attrs(props => ({
  style: {
    left: -props.borderLeft,
    top: -props.borderTop
  },
  width: props.borderLeft + props.borderRight + props.width,
  height: props.borderTop + props.borderBottom + props.height
}))`
  position: absolute;
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

  const { width: contentWidth, height: contentHeight } = border;

  return (
    <Container {...rest}>
      {children && children(contentWidth, contentHeight)}
      <Border src={hardware.borderImage} {...border} />
    </Container>
  );
}

export default Hardware;
