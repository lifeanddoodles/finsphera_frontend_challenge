import Button from "@/components/Button";
import { Card } from "@/components/Carousel/Card";
import {
  CarouselProps,
  MovieProps,
  TvShowProps,
} from "@/components/Carousel/Carousel.types";
import Heading from "@/components/Heading";
import { BASE_IMAGE_URL } from "@/utils/constants";
import { isMovieProps, isTvShowProps } from "./utils";

const Carousel = <T extends TvShowProps | MovieProps>({
  title,
  resourceName,
  resources,
  width = 240,
  height = 360,
  imagePathBase = `${BASE_IMAGE_URL}/w300`,
}: CarouselProps<T>) => {
  return (
    <div className="overflow-hidden mb-10">
      <Heading className="px-6 mb-4">{title}</Heading>
      {resources.length > 0 ? (
        <div className="relative">
          <div className="flex gap-2 px-6">
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
          <Button
            ariaLabel="Scroll left"
            variant="ghost"
            className="absolute top-0 bottom-0 left-0 text-xl text-white rounded-none m-0 opacity-0 hover:text-white hover:opacity-100 hover:bg-[#00000080] transition duration-300 ease-in-out"
          >
            Left
          </Button>
          <Button
            ariaLabel="Scroll right"
            variant="ghost"
            className="absolute top-0 right-0 bottom-0 text-xl text-white rounded-none m-0 opacity-0 hover:text-white hover:opacity-100 hover:bg-[#00000080] transition duration-300 ease-in-out"
          >
            Right
          </Button>
        </div>
      ) : (
        "No results found"
      )}
    </div>
  );
};

export default Carousel;
