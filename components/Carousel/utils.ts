import { MovieProps, TvShowProps } from "@/components/Carousel/Carousel.types";

export function isMovieProps(resource: any): resource is MovieProps {
  return (resource as MovieProps).title !== undefined;
}

export function isTvShowProps(resource: any): resource is TvShowProps {
  return (resource as TvShowProps).name !== undefined;
}
