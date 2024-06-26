import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";

export type CardProps = {
  id: number;
  posterPath: string;
  href?: string;
  averageRating?: number;
  width: number;
  height: number;
  className?: string;
  children?: React.ReactNode;
};

export type MovieProps = {
  original_title: string;
  release_date: string;
  title: string;
  video: false;
};

export type TvShowProps = {
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
};

export type ResourceProps<T> = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
} & T;

export type CarouselProps<T> = {
  title: string;
  resourceName: string;
  resources: ResourceDetailsProps<T>[] | (T & { id: number })[];
  width?: number;
  height?: number;
  imagePathBase?: string;
  imageKey?: string;
  pathToFooter?: keyof T;
};
