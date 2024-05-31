"use client";
import Figure, { Figcaption } from "@/components/Figure";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Image from "next/image";
import Link from "next/link";
import { CardProps } from "./Carousel.types";

export const Card = ({
  id,
  title,
  posterPath,
  href,
  averageRating,
  width,
  height,
}: CardProps) => {
  return (
    <Link key={id} href={href} className="shrink-0 w-60">
      <Figure>
        <div className="p-1">
          <Image
            src={posterPath}
            alt=""
            width={width}
            height={height}
            className="object-cover min-h-full hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>
        <Figcaption className="p-1 flex flex-col gap-1">
          <Heading
            level={3}
            className="text-sm sm:text-base sm:leading-tight font-medium"
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
