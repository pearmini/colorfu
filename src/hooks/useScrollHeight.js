import { useState, useEffect } from "react";

export default function() {
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", e => {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;
      setScrollHeight(scrollHeight);
    });
    return () => {
      window.removeEventListener("scroll", this);
    };
  });
  return scrollHeight;
}
