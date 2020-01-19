import { useState, useEffect } from "react";
export default function() {
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  useEffect(() => {
    window.addEventListener("mousemove", e => {
      const { clientX, clientY } = e;
      setMouseX(clientX);
      setMouseY(clientY);
    });
    return () => {
      window.removeEventListener("mousemove", this);
    };
  });

  return [mouseX, mouseY];
}
