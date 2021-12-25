export function loadImage(imageURL) {
  const newImage = new Image();
  newImage.src = imageURL;
  return new Promise((resolve, reject) => {
    newImage.onload = function () {
      resolve(newImage);
    };
    // 这样上层才能捕获异常
    newImage.onerror = function () {
      reject();
    };
  });
}

export function loadFont(fontURL, fontFamily) {
  return new FontFace(fontFamily, `url(${fontURL})`).load();
}
