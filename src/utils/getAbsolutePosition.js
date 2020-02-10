export default function(element) {
  let { offsetLeft: actualLeft, offsetTop: actualTop } = element;
  let current = element.offsetParent;
  while (current) {
    actualLeft += current.offsetLeft;
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return {
    left: actualLeft,
    top: actualTop
  };
}
