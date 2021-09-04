export function loadFont(fontFace, { fontFamily, fontURL }) {
  if (!fontURL || (fontFace && fontFace.loaded)) {
    return Promise.resolve(fontFace);
  }
  return new FontFace(fontFamily, `url(${fontURL})`).load();
}

export function loadImage(image, { imageURL }) {
  if (image) return Promise.resolve(image);
  const newImage = new Image();
  newImage.src = imageURL;
  return new Promise((resolve) => {
    newImage.onload = function() {
      resolve(newImage);
    };
  });
}
