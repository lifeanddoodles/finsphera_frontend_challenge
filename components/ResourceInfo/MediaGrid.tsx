import Heading from "@/components/Heading";
import { BASE_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";

const MediaGridItem = ({
  resourceName,
  resource,
}: {
  resourceName: "images" | "videos";
  // TODO: Add more accurate type for resources
  resource: any;
}) => {
  return resourceName === "videos" ? (
    <div className="relative aspect-[16/9]">
      <iframe
        width="420"
        height="236"
        src={`https://www.youtube.com/embed/${resource.key}`}
        className="absolute w-full h-full"
      ></iframe>
      {/* TODO: Add flexibility to add other video embeds, not just YouTube */}
    </div>
  ) : (
    <div className="relative">
      <Image
        src={`${BASE_IMAGE_URL}/w300/${resource.file_path}`}
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
  // TODO: Add more accurate type for resources
  resources: any[];
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
          // TODO: Fix Suspense not working
          <Suspense
            key={resource.key || resource.file_path}
            fallback={"Loading"}
          >
            <MediaGridItem resourceName={resourceName} resource={resource} />
          </Suspense>
        ))}
        {/* TODO: Add pagination, control with Show More button */}
      </div>
    </>
  );
};

export default MediaGrid;
