"use client";

import ResourceInfo from "@/components/ResourceInfo";
import {
  MovieDetailsProps,
  ResourceDetailsProps,
} from "@/components/ResourceInfo/ResourceInfo.types";
import { movieMetaTitles } from "@/components/ResourceInfo/utils";
import Text from "@/components/Text";
import { BASE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";

const resourceName = "movie";

const ResourceDetails = ({ params: { id } }: { params: { id: string } }) => {
  const [resource, setResource] =
    useState<ResourceDetailsProps<MovieDetailsProps> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${BASE_URL}/${resourceName}/${id}?append_to_response=videos,credits,images,external_ids,release_dates,combined_credits&include_image_language=en&language=en&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        setResource(json);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Text role="status">Loading...</Text>;
  if (error) return <Text role="status">{error}</Text>;

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <ResourceInfo
        resource={resource as ResourceDetailsProps<MovieDetailsProps>}
        metaTitles={movieMetaTitles}
      />
    </main>
  );
};

export default ResourceDetails;
