export function loadFont(fontFace, { fontFamily, fontURL }) {
  try {
    if (!fontURL || (fontFace && fontFace.loaded)) return Promise.resolve(fontFace);
    return new FontFace(fontFamily, `url(${fontURL})`).load();
  } catch {
    console.error("加载字体失败");
  }
}
