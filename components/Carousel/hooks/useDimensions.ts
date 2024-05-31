import { useEffect, useRef, useState } from "react";

const useDimensions = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const setDimensions = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
        setHeight(elementRef.current.offsetHeight);
      }
    };

    setDimensions();

    window.addEventListener("resize", setDimensions);
  }, [elementRef]);

  return {
    elementRef,
    dimensions: {
      width,
      height,
    },
  };
};

export default useDimensions;
