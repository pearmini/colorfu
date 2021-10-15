import { saveAs } from "file-saver";

export function readFile(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise(resolve => {
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}

export function downloadImage(canvas, filename) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = canvas.toDataURL("image/png");
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function downloadFile(obj, filename) {
  const file = new File([JSON.stringify(obj)], `${filename}.json`, {
    type: "text/plain;charset=utf-8"
  });
  saveAs(file);
}
