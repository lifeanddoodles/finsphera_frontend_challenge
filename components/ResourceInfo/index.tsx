"use client";
import Carousel from "@/components/Carousel";
import { isMovieProps, isTvShowProps } from "@/components/Carousel/utils";
import DescriptionList from "@/components/DescriptionList";
import Heading from "@/components/Heading";
import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import Text from "@/components/Text";
import { BASE_IMAGE_URL } from "@/utils/constants";
import { useState } from "react";
import { MetaContentColumns } from "./MetaContentColumns";
import { movieMetaTitles, tabTitles, tvShowMetaTitles } from "./utils";

const ResourceInfo = <T,>({
  resource,
  metaTitles,
}: {
  resource: ResourceDetailsProps<T>;
  metaTitles: typeof movieMetaTitles | typeof tvShowMetaTitles;
}) => {
  const [activeTab, setActiveTab] = useState(tabTitles.overview);

  return (
    <>
      <section>
        <Heading level={1} className="mb-8">
          {isMovieProps(resource)
            ? resource.title
            : isTvShowProps(resource)
              ? resource.name
              : ""}
        </Heading>
        <div>
          <Heading className="mb-4">Storyline</Heading>
          <Text className="mb-4">{resource?.overview}</Text>
          <DescriptionList>
            <MetaContentColumns
              items={metaTitles as typeof metaTitles}
              resource={resource as ResourceDetailsProps<T>}
            />
          </DescriptionList>
        </div>
      </section>
      <section>
        <Carousel
          title="Cast"
          resources={resource.credits.cast}
          resourceName={"cast"}
          imagePathBase={`${BASE_IMAGE_URL}/w300`}
          imageKey={"profile_path"}
          width={200}
          height={300}
          pathToFooter="character"
        />
      </section>
    </>
  );
};

export default ResourceInfo;
