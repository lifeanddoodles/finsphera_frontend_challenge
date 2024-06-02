import { Card } from "@/components/Carousel/Card";
import { CarouselProps } from "@/components/Carousel/Carousel.types";
import { CarouselButton } from "@/components/Carousel/CarouselButton";
import Heading from "@/components/Heading";
import {
  MovieDetailsProps,
  ResourceDetailsProps,
  TvShowDetailsProps,
} from "@/components/ResourceInfo/ResourceInfo.types";
import Text from "@/components/Text";
import { BASE_IMAGE_URL } from "@/utils/constants";
import { useRef, useState } from "react";
import useCarouselNavigation from "./hooks/useCarouselNavigation";
import useDimensions from "./hooks/useDimensions";
import { GAP_UNIT, isMovieProps } from "./utils";

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
  pathToFooter,
}: CarouselProps<T>) => {
  const carouselRef = useRef<HTMLUListElement>(null);
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
    <section className="overflow-hidden py-2 mb-10" ref={carouselContainerRef}>
      <Heading className={`px-6 mb-4`}>{title}</Heading>
      {resources.length > 0 ? (
        <div className="relative">
          <ul
            className={`flex gap-${GAP_UNIT} px-6 transition-transform duration-300 ease-in-out`}
            ref={carouselRef}
            style={{
              transform: `translateX(-${currentStep * translateXAmount}px)`,
            }}
          >
            {resources.map((resource) => (
              <Card
                key={resource.id}
                id={resource.id}
                posterPath={`${imagePathBase}/${resource[imageKey as keyof T]}`}
                href={`/${resourceName}/${resource.id}`}
                width={width}
                height={height}
                className={`grid-rows-[auto,_1fr]`}
              >
                <Card.Footer>
                  <Heading
                    level={3}
                    className={`p-1 text-sm sm:text-base sm:leading-tight font-medium max-w-[240px]`}
                  >
                    {isMovieProps(resource) ? resource.title : resource.name}
                  </Heading>
                  {resource.vote_average && (
                    <Text
                      as="span"
                      size="sm"
                      className="p-1 mb-2 max-w-[240px]"
                    >
                      {resource.vote_average}
                    </Text>
                  )}
                  {pathToFooter && (
                    <Text
                      as="span"
                      size="sm"
                      className="px-1 mb-2 leading-none max-w-[240px]"
                    >
                      {resource[pathToFooter] as string}
                    </Text>
                  )}
                </Card.Footer>
              </Card>
            ))}
          </ul>
          {/**
           * TODO: If carouselWidth <= containerWidth, remove buttons
           */}
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
    </section>
  );
};

export default Carousel;
