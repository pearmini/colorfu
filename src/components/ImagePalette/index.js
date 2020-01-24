import { usePalette } from "react-palette";
import { useState } from "react";
import { Button, Upload, Icon } from "antd";
export default function({ imageUrl, onSelect, onChange }) {
  const [src, setSrc] = useState(imageUrl);
  const { data } = usePalette(src);
  const colors = Object.keys(data).map(key => data[key]);

  function handleUpload(data) {
    const file = data.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const url = reader.result;
      onChange && onChange(url);
      setSrc(url);
    };
  }

  return (
    <div>
      <div>
        {src ? (
          <div>
            <img src={src} style={{ maxHeight: 200, maxWidth: 200 }} />
            <Button
              icon="delete"
              onClick={() => {
                setSrc("");
                onChange("");
              }}
            />
          </div>
        ) : (
          <div>
            <Upload onChange={handleUpload}>
              <Button>
                <Icon type="upload" />
              </Button>
            </Upload>
            <div>上传图片，自动提取配色</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex" }}>
        {colors.map(color => (
          <div
            key={color}
            style={{
              height: 20,
              width: 20,
              backgroundColor: color,
              cursor: "pointer"
            }}
            onClick={() => onSelect && onSelect(color)}
          ></div>
        ))}
      </div>
    </div>
  );
}
