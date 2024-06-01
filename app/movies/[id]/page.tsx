"use client";
import {
  MovieProps,
  ResourceProps,
} from "@/components/Carousel/Carousel.types";
import DescriptionList, {
  DescriptionDetails,
  DescriptionTerm,
} from "@/components/DescriptionList";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import { BASE_URL } from "@/utils/constants";
import { Fragment, useEffect, useState } from "react";

const tabTitles = {
  overview: "Overview",
  videos: "Videos",
  photos: "Photos",
};

const movieMetaTitles = {
  release_date: "Released",
  "credits.crew?job=Director": "Director",
  revenue: "Revenue",
  status: "Status",
  "[production_companies].name": "Production",
  runtime: "Runtime",
  budget: "Budget",
  "[genres].name": "Genre",
  "[spoken_languages].name": "Language",
} as const;

type MovieMetaKeys = keyof typeof movieMetaTitles;
type PossibleKeyValueTypes = string | number | boolean | null;

const resourceName = "movie";

export function getValue<T>(
  key: T & string,
  resource: ResourceProps<MovieProps>
) {
  if (key.includes("[")) {
    const keyTuple = key.replace(/\[|\]/g, "").split(".");
    const keyName = keyTuple[0] as keyof ResourceProps<MovieProps>;
    const valuePath = keyTuple[1];

    return resource[keyName]
      .map(
        (item: { [currentKey: string]: PossibleKeyValueTypes }) =>
          item[valuePath]
      )
      .join(", ");
  }

  if (key.includes(".")) {
    const pathSteps = key.split(".");
    let currentStepValue = resource;

    pathSteps.forEach((step) => {
      if (step.includes("?")) {
        const currentStepWithQuery = step.split("?");
        const currentStepName = currentStepWithQuery[0];
        const queryKey = currentStepWithQuery[1].split("=")[0];
        const queryValue = currentStepWithQuery[1].split("=")[1];
        currentStepValue = currentStepValue[currentStepName];

        if (Array.isArray(currentStepValue)) {
          const match = currentStepValue.find(
            (item) => item[queryKey] === queryValue
          );
          currentStepValue = match.name;
        }
      } else {
        currentStepValue = currentStepValue[step];
      }
    });

    return currentStepValue;
  }

  return resource[key as keyof ResourceProps<MovieProps>];
}

const MetaContent = <T extends Record<string, PossibleKeyValueTypes>>({
  items,
  resource,
  start = 0,
  end,
}: {
  items: T;
  resource: ResourceProps<MovieProps>;
  start?: number;
  end?: number;
}) =>
  Object.entries(items)
    .slice(start, end)
    .map(([key, value]) => (
      <Fragment key={key}>
        <DescriptionTerm>{value}</DescriptionTerm>
        <DescriptionDetails>
          {getValue(
            key as MovieMetaKeys,
            resource as ResourceProps<MovieProps>
          )}
        </DescriptionDetails>
      </Fragment>
    ));

const MetaContentColumns = <T extends Record<string, PossibleKeyValueTypes>>({
  items,
  resource,
}: {
  items: T;
  resource: ResourceProps<MovieProps>;
}) => (
  <>
    <div className="grid grid-cols-[auto,_1fr] gap-x-4 gap-y-1 auto-rows-min">
      <MetaContent
        items={items}
        resource={resource}
        start={0}
        end={Math.ceil(Object.keys(items).length / 2)}
      />
    </div>
    <div className="grid grid-cols-[auto,_1fr] gap-x-4 gap-y-1 auto-rows-min">
      <MetaContent
        items={items}
        resource={resource as ResourceProps<MovieProps>}
        start={Math.ceil(Object.keys(items).length / 2)}
      />
    </div>
  </>
);

const ResourceDetails = ({ params: { id } }: { params: { id: string } }) => {
  const [resource, setResource] = useState<ResourceProps<MovieProps> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(tabTitles.overview);

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
    <div>
      <Heading level={1} className="mb-8">
        {resource?.title}
      </Heading>
      <div>
        <Heading className="mb-4">Storyline</Heading>
        <Text className="mb-4">{resource?.overview}</Text>
        <DescriptionList>
          <MetaContentColumns
            items={movieMetaTitles as typeof movieMetaTitles}
            resource={resource as ResourceProps<MovieProps>}
          />
        </DescriptionList>
      </div>
    </div>
  );
};

export default ResourceDetails;
