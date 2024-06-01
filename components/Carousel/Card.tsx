import Figure, { Figcaption } from "@/components/Figure";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { CardProps } from "./Carousel.types";

export const Footer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const Card = ({
  id,
  posterPath,
  href = "",
  width = 240,
  height = 360,
  className,
  children,
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
        <Figcaption className="flex flex-col gap-1">{children}</Figcaption>
      </Figure>
    </Link>
  );
};

Card.Footer = Footer;
