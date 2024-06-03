"use client";
import Carousel from "@/components/Carousel";
import {
  MovieProps,
  ResourceProps,
  TvShowProps,
} from "@/components/Carousel/Carousel.types";
import Loading from "@/components/Loading";
import Text from "@/components/Text";
import { BASE_IMAGE_URL } from "@/utils/constants";

const ReqCarouselResult = ({
  title,
  resourceName,
  resources,
  width = 240,
  height = 360,
  imagePathBase = `${BASE_IMAGE_URL}/w300`,
  imageKey = "poster_path",
  loading,
  error,
  noResultsText = "No results found",
}: {
  title: string;
  resourceName: string;
  resources: ResourceProps<TvShowProps | MovieProps>[] | null;
  width?: number;
  height?: number;
  imagePathBase?: string;
  imageKey?: string;
  loading: boolean;
  error: string | null;
  noResultsText?: string;
}) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Text role="status">{error}</Text>
      ) : resources !== null && resources?.length > 0 ? (
        <Carousel
          title={title}
          resourceName={resourceName}
          resources={resources}
          width={width}
          height={height}
          imagePathBase={imagePathBase}
          imageKey={imageKey}
        />
      ) : (
        <Text role="status">{noResultsText}</Text>
      )}
    </>
  );
};

export default ReqCarouselResult;
