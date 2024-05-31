import { useMemo } from "react";
import { GAP_UNIT, PADDING_X_UNIT, unitToPixels } from "../utils";

const useCarouselNavigation = ({
  resourcesLength,
  resourceCardWidth,
  carouselContainerWidth,
}: {
  resourcesLength: number;
  resourceCardWidth: number;
  carouselContainerWidth: number;
}) => {
  const containerPaddingX = unitToPixels(PADDING_X_UNIT) * 2;
  const gapsWidthSum = unitToPixels(GAP_UNIT) * (resourcesLength - 1);
  const carouselWidth =
    containerPaddingX + gapsWidthSum + resourcesLength * resourceCardWidth;
  const totalSteps = useMemo(() => {
    return Math.ceil(carouselWidth / carouselContainerWidth);
  }, [carouselWidth, carouselContainerWidth]);
  const translateXAmount = useMemo(() => {
    return carouselWidth / totalSteps;
  }, [carouselWidth, totalSteps]);

  return {
    totalSteps,
    translateXAmount,
  };
};

export default useCarouselNavigation;
