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
        width: 1800,
        height: 1500,
        ratio: 1.6
      }
    },
    ipad: {
      borderImage: ipadBorder,
      borderProps: {
        width: 1800,
        height: 1350,
        top: 189,
        left: 237,
        right: 237,
        bottom: 155
      }
    },
    iphone: {
      borderImage: iphoneBorder,
      borderProps: {
        width: 2500,
        height: 2500,
        top: 400,
        left: 858,
        right: 804,
        bottom: 275
      }
    },
    imac: {
      borderImage: imacBorder,
      borderProps: {
        left: 190,
        right: 190,
        top: 181,
        bottom: 531,
        width: 1800,
        height: 1500,
        ratio: 1.8
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
