"use client";
import Carousel from "@/components/Carousel";
import { isMovieProps, isTvShowProps } from "@/components/Carousel/utils";
import DescriptionList from "@/components/DescriptionList";
import Heading from "@/components/Heading";
import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import Text from "@/components/Text";
import { BASE_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import { useState } from "react";
import TabPanels, { TabPanel } from "../TabPanels";
import MediaGrid from "./MediaGrid";
import { MetaContentColumns } from "./MetaContentColumns";
import { movieMetaTitles, tabTitles, tvShowMetaTitles } from "./utils";

/**
 * Renders the information about a resource.
 *
 * @param {ResourceDetailsProps<T>} resource - The resource details.
 * @param {typeof movieMetaTitles | typeof tvShowMetaTitles} metaTitles - The meta titles for the resource.
 * @return {JSX.Element} The rendered resource information.
 */
const ResourceInfo = <T,>({
  resource,
  metaTitles,
}: {
  resource: ResourceDetailsProps<T>;
  metaTitles: typeof movieMetaTitles | typeof tvShowMetaTitles;
}): JSX.Element => {
  const [activeTab, setActiveTab] = useState(tabTitles[0].name);

  return (
    <>
      <Heading
        level={1}
        className="px-6 mt-8 mb-8 sm:mt-12 sm:text-4xl xl:text-5xl"
      >
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
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6 max-w-screen-xl">
            <div className="flex flex-col flex-none">
              <Image
                src={`${BASE_IMAGE_URL}/w300/${resource?.poster_path}`}
                alt=""
                width={200}
                height={300}
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col max-w-[66ch]">
              <Heading className="mb-4">Storyline</Heading>
              <Text className="mb-4">{resource?.overview}</Text>
              <DescriptionList>
                <MetaContentColumns
                  items={metaTitles as typeof metaTitles}
                  resource={resource as ResourceDetailsProps<T>}
                />
              </DescriptionList>
            </div>
          </div>
        </TabPanel>
        <TabPanel id="panel-videos" activeTab={activeTab}>
          {resource.videos.results?.length > 0 ? (
            <MediaGrid
              resourceName="videos"
              resources={resource.videos.results}
            />
          ) : (
            <Text className="text-center px-6" role="status">
              No videos found
            </Text>
          )}
        </TabPanel>
        <TabPanel id="panel-photos" activeTab={activeTab}>
          {resource.images.backdrops?.length > 0 ? (
            <MediaGrid
              title="Backdrops"
              resourceName="images"
              resources={resource.images.backdrops}
            />
          ) : (
            <Text className="text-center px-6 mb-6" role="status">
              No backdrops found
            </Text>
          )}
          {resource.images.posters?.length > 0 ? (
            <MediaGrid
              title="Posters"
              resourceName="images"
              resources={resource.images.posters}
            />
          ) : (
            <Text className="text-center px-6" role="status">
              No posters found
            </Text>
          )}
        </TabPanel>
      </TabPanels>
      {/* TODO: Add fallback when no image exists */}
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
    </>
  );
};

export default ResourceInfo;
