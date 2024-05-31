import { Card } from "@/components/Carousel/Card";
import {
  CarouselProps,
  MovieProps,
  TvShowProps,
} from "@/components/Carousel/Carousel.types";
import { CarouselButton } from "@/components/Carousel/CarouselButton";
import Heading from "@/components/Heading";
import { BASE_IMAGE_URL } from "@/utils/constants";
import { useRef, useState } from "react";
import useCarouselNavigation from "./hooks/useCarouselNavigation";
import useDimensions from "./hooks/useDimensions";
import { GAP_UNIT, PADDING_X_UNIT, isMovieProps, isTvShowProps } from "./utils";

const Carousel = <T extends TvShowProps | MovieProps>({
  title,
  resourceName,
  resources,
  width = 240,
  height = 360,
  imagePathBase = `${BASE_IMAGE_URL}/w300`,
}: CarouselProps<T>) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const {
    elementRef: carouselContainerRef,
    dimensions: { width: carouselContainerWidth },
  } = useDimensions();
  const { totalSteps, translateXAmount } = useCarouselNavigation({
    resourcesLength: resources.length,
    resourceCardWidth: width,
    carouselContainerWidth,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleScrollLeft = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(totalSteps - 1);
    }
  };

  const handleScrollRight = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  return (
    <div className="overflow-hidden mb-10" ref={carouselContainerRef}>
      <Heading className={`px-${PADDING_X_UNIT} mb-4`}>{title}</Heading>
      {resources.length > 0 ? (
        <div className="relative">
          <div
            className={`flex gap-${GAP_UNIT} px-${PADDING_X_UNIT}`}
            ref={carouselRef}
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: `translateX(-${currentStep * translateXAmount}px)`,
            }}
          >
            {resources.map((resource) => (
              <Card
                key={resource.id}
                id={resource.id}
                title={
                  isMovieProps(resource)
                    ? resource.title
                    : isTvShowProps(resource)
                      ? resource.name
                      : ""
                }
                posterPath={`${imagePathBase}/${resource.poster_path}`}
                href={`/${resourceName}/${resource.id}`}
                averageRating={resource.vote_average}
                width={width}
                height={height}
              />
            ))}
          </div>
          <CarouselButton
            ariaLabel="Scroll left"
            onClick={handleScrollLeft}
            direction="left"
          />
          <CarouselButton
            ariaLabel="Scroll right"
            onClick={handleScrollRight}
            direction="right"
          />
        </div>
      ) : (
        "No results found"
      )}
    </div>
  );
};

export default Carousel;
