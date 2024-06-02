import Heading from "@/components/Heading";
import {
  ImageProps,
  MediaDetailsProps,
  VideoProps,
} from "@/components/ResourceInfo/ResourceInfo.types";
import { BASE_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const MediaGridItem = ({
  resourceName,
  resource,
}: {
  resourceName: "images" | "videos";
  resource: MediaDetailsProps;
}) => {
  return resourceName === "videos" ? (
    <div className="relative aspect-[16/9]">
      <iframe
        width="420"
        height="236"
        src={`https://www.youtube.com/embed/${(resource as VideoProps).key}`}
        className="absolute w-full h-full"
      ></iframe>
      {/* TODO: Add flexibility to add other video embeds, not just YouTube */}
    </div>
  ) : (
    <div className="relative">
      <Image
        src={`${BASE_IMAGE_URL}/w300/${(resource as ImageProps).file_path}`}
        alt=""
        width={200}
        height={300}
        className="w-full object-fill"
      />
    </div>
  );
};

const MediaGrid = ({
  title,
  resourceName,
  resources,
}: {
  title?: string;
  resourceName: "images" | "videos";
  resources: MediaDetailsProps[];
}) => {
  const classes = twMerge(
    "grid grid-cols-1 gap-4 auto-rows-auto mb-10",
    resourceName === "images"
      ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3"
  );
  return (
    <>
      {title && <Heading className="mb-4">{title}</Heading>}
      <div className={classes}>
        {resources.map((resource: any) => (
          <MediaGridItem
            key={resource.key || resource.file_path}
            resourceName={resourceName}
            resource={resource}
          />
        ))}
        {/* TODO: Add pagination, control with Show More button */}
      </div>
    </>
  );
};

export default MediaGrid;
