export default function withBorder({
  width: imageWidth,
  height: imageHeight,
  left,
  right,
  top,
  bottom,
  ratio
}) {
  const screenWidth = imageWidth - left - right,
    screenHeight = imageHeight - top - bottom;

  return function(props) {
    let { height, width } = props;

    !height && !width && ((height = 100), (width = height * ratio));
    !height && width && (height = width / ratio);
    height && !width && (width = height * ratio);

    // 计算相应的 border
    const borderLeft = (width * left) / screenWidth,
      borderRight = borderLeft,
      borderTop = (height * top) / screenHeight,
      borderBottom = (height * bottom) / screenHeight;

    return {
      borderLeft,
      borderRight,
      borderBottom,
      borderTop,
      width,
      height
    };
  };
}
