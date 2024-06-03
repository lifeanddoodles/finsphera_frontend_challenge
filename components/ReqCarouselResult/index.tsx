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

/**
 * Renders a carousel component, a status message, or a loading indicator based on the provided props.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - title: The title of the carousel.
 *   - resourceName: The name of the resource being displayed in the carousel.
 *   - resources: An array of resources to be displayed in the carousel.
 *   - width: The width of each resource in the carousel (default: 240).
 *   - height: The height of each resource in the carousel (default: 360).
 *   - imagePathBase: The base URL for the image paths of the resources (default: `${BASE_IMAGE_URL}/w300`).
 *   - imageKey: The key for the image property of each resource (default: "poster_path").
 *   - loading: A boolean indicating whether the carousel is in a loading state.
 *   - error: A string representing any error that occurred while fetching the resources.
 *   - noResultsText: The text to display when there are no resources to display in the carousel (default: "No results found").
 * @return {JSX.Element} The rendered carousel component.
 */
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
}): JSX.Element => {
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
