"use client";
import Carousel from "@/components/Carousel";
import { isMovieProps, isTvShowProps } from "@/components/Carousel/utils";
import DescriptionList from "@/components/DescriptionList";
import Heading from "@/components/Heading";
import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import Text from "@/components/Text";
import { BASE_IMAGE_URL } from "@/utils/constants";
import { useState } from "react";
import TabPanels, { TabPanel } from "../TabPanels";
import MediaGrid from "./MediaGrid";
import { MetaContentColumns } from "./MetaContentColumns";
import { movieMetaTitles, tabTitles, tvShowMetaTitles } from "./utils";

const ResourceInfo = <T,>({
  resource,
  metaTitles,
}: {
  resource: ResourceDetailsProps<T>;
  metaTitles: typeof movieMetaTitles | typeof tvShowMetaTitles;
}) => {
  const [activeTab, setActiveTab] = useState(tabTitles[0].name);

  return (
    <>
      <Heading level={1} className="mb-8">
        {isMovieProps(resource)
          ? resource.title
          : isTvShowProps(resource)
            ? resource.name
            : ""}
      </Heading>
      <TabPanels
        tabs={tabTitles}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <TabPanel id="panel-overview" activeTab={activeTab}>
          <Heading className="mb-4">Storyline</Heading>
          <Text className="mb-4">{resource?.overview}</Text>
          <DescriptionList>
            <MetaContentColumns
              items={metaTitles as typeof metaTitles}
              resource={resource as ResourceDetailsProps<T>}
            />
          </DescriptionList>
        </TabPanel>
        <TabPanel id="panel-videos" activeTab={activeTab}>
          {/** TODO: Create MediaGrid */}
          {resource.videos.results?.length > 0 ? (
            <MediaGrid
              resourceName="videos"
              resources={resource.videos.results}
            />
          ) : (
            "No videos found"
          )}
        </TabPanel>
        <TabPanel id="panel-photos" activeTab={activeTab}>
          {/** TODO: Create MediaGrid */}
          {resource.images.backdrops?.length > 0 ? (
            <MediaGrid
              title="Backdrops"
              resourceName="images"
              resources={resource.images.backdrops}
            />
          ) : (
            "No backdrops found"
          )}
          {resource.images.posters?.length > 0 ? (
            <MediaGrid
              title="Posters"
              resourceName="images"
              resources={resource.images.posters}
            />
          ) : (
            "No posters found"
          )}
        </TabPanel>
      </TabPanels>
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
