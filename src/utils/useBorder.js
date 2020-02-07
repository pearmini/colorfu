export default function(props) {
  let { height, width } = props;
  const ratio = 1.6;
  !height && !width && ((height = 100), (width = height * ratio));
  !height && width && (height = width / ratio);
  height && !width && (width = height * ratio);

  // 在图片中每条线到对应边的距离
  const left = 145,
    right = left,
    top = 45,
    bottom = 85;

  // 图片的宽和高以及屏幕的宽和高
  const imageWidth = 1211,
    imageHeight = 707,
    imageScreenWidth = imageWidth - left - right,
    imageScreenHeight = imageHeight - top - bottom;

  // 计算相应的 border
  const borderLeft = width * (left / imageScreenWidth),
    borderRight = borderLeft,
    borderTop = (height * top) / imageScreenHeight,
    borderBottom = (height * bottom) / imageScreenHeight;

  return {
    borderLeft,
    borderRight,
    borderBottom,
    borderTop,
    left,
    right,
    top,
    bottom,
    width,
    height
  };
}
