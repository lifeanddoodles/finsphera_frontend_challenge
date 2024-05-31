import { MovieProps, TvShowProps } from "@/components/Carousel/Carousel.types";

export const PADDING_X_UNIT = 6;
export const GAP_UNIT = 2;

export function isMovieProps(resource: any): resource is MovieProps {
  return (resource as MovieProps).title !== undefined;
}

export function isTvShowProps(resource: any): resource is TvShowProps {
  return (resource as TvShowProps).name !== undefined;
}

export function unitToPixels(unit: number) {
  return unit * 4;
}
