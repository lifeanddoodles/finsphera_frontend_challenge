"use client";

import Loading from "@/components/Loading";
import ResourceInfo from "@/components/ResourceInfo";
import {
  ResourceDetailsProps,
  TvShowDetailsProps,
} from "@/components/ResourceInfo/ResourceInfo.types";
import { tvShowMetaTitles } from "@/components/ResourceInfo/utils";
import Text from "@/components/Text";
import useFetch from "@/hooks/useFetch";
import { BASE_URL } from "@/utils/constants";

const resourceName = "tv";

const ResourceDetails = ({ params: { id } }: { params: { id: string } }) => {
  const {
    data: resource,
    loading,
    error,
  } = useFetch(
    `${BASE_URL}/${resourceName}/${id}?append_to_response=videos,credits,images,external_ids,release_dates,combined_credits&include_image_language=en&language=en&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  if (loading) return <Loading />;
  if (error) return <Text role="status">{error}</Text>;

  return (
    <ResourceInfo
      resource={resource as ResourceDetailsProps<TvShowDetailsProps>}
      metaTitles={tvShowMetaTitles}
    />
  );
};

export default ResourceDetails;
