import { useState } from "react";

export default function(initialValue) {
  const [image, setImage] = useState(initialValue);
  const handleValueChnage = e => {
    const file = document.getElementById("imageInput").files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageURL = e.target.result;
      setImage(imageURL);
    };
    reader.readAsDataURL(file);
  };
  return {
      value: image,
      onChange: handleValueChnage
  }
}
