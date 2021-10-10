export function loadImage(imageURL) {
  const newImage = new Image();
  newImage.src = imageURL;
  return new Promise(resolve => {
    newImage.onload = function() {
      resolve(newImage);
    };
  });
}

export function loadFont(fontURL, fontFamily) {
  return new FontFace(fontFamily, `url(${fontURL})`).load();
}
