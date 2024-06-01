import Figure, { Figcaption } from "@/components/Figure";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { CardProps } from "./Carousel.types";

export const Card = ({
  id,
  title,
  posterPath,
  href = "",
  averageRating,
  width = 240,
  height = 360,
  className,
}: CardProps) => {
  const figureClasses = twMerge("min-h-full", className);

  return (
    <Link key={id} href={href} className="shrink-0 grow-0">
      <Figure className={figureClasses}>
        <div className={"hover:scale-105 transition duration-300 ease-in-out"}>
          <Image
            src={posterPath}
            alt=""
            width={width}
            height={height}
            className="aspect-[10/15] object-cover min-h-full"
          />
        </div>
        <Figcaption className="flex flex-col gap-1">
          <Heading
            level={3}
            className={`p-1 inline-block text-sm sm:text-base sm:leading-tight font-medium max-w-[240px]`}
          >
            {title}
          </Heading>
          <Text as="span" size="sm">
            {averageRating}
          </Text>
        </Figcaption>
      </Figure>
    </Link>
  );
};
