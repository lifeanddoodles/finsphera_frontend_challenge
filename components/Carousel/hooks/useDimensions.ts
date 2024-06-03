import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that returns the dimensions of a HTMLDivElement or HTMLUListElement.
 *
 * @return {Object} An object containing a reference to the element and its dimensions.
 */
const useDimensions = () => {
  const elementRef = useRef<HTMLDivElement | HTMLUListElement | null>(null);
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
