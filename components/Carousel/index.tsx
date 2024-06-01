import { Card } from "@/components/Carousel/Card";
import { CarouselProps } from "@/components/Carousel/Carousel.types";
import { CarouselButton } from "@/components/Carousel/CarouselButton";
import Heading from "@/components/Heading";
import {
  MovieDetailsProps,
  ResourceDetailsProps,
  TvShowDetailsProps,
} from "@/components/ResourceInfo/ResourceInfo.types";
import { BASE_IMAGE_URL } from "@/utils/constants";
import { useRef, useState } from "react";
import useCarouselNavigation from "./hooks/useCarouselNavigation";
import useDimensions from "./hooks/useDimensions";
import { GAP_UNIT, PADDING_X_UNIT, isMovieProps, isTvShowProps } from "./utils";

const Carousel = <
  T extends
    | ResourceDetailsProps<TvShowDetailsProps | MovieDetailsProps>
    | Record<string, any>,
>({
  title,
  resourceName,
  resources,
  width = 240,
  height = 360,
  imagePathBase = `${BASE_IMAGE_URL}/w300`,
  imageKey = "poster_path",
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
    <div className="overflow-hidden mb-10">
      <Heading className={`px-${PADDING_X_UNIT} mb-4`}>{title}</Heading>
      {resources.length > 0 ? (
        <div className="relative" ref={carouselContainerRef}>
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
                posterPath={`${imagePathBase}/${resource[imageKey as keyof T]}`}
                href={`/${resourceName}/${resource.id}`}
                // averageRating={resource.vote_average}
                width={width}
                height={height}
                className={`grid-rows-[auto,_1fr]`}
              />
            ))}
          </div>
          <CarouselButton
            ariaLabel="Scroll left"
            onClick={handleScrollLeft}
            direction="left"
            className="left-0"
          />
          <CarouselButton
            ariaLabel="Scroll right"
            onClick={handleScrollRight}
            direction="right"
            className="right-0"
          />
        </div>
      ) : (
        "No results found"
      )}
    </div>
  );
};

export default Carousel;
