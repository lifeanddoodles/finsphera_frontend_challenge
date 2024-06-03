import Figure, { Figcaption } from "@/components/Figure";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { CardProps } from "./Carousel.types";

export const Footer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

/**
 * Renders a card component with an image, link, and optional children.
 *
 * @param {CardProps} props - The props object containing the following properties:
 *   - id: The unique identifier for the card.
 *   - posterPath: The URL of the image to display in the card.
 *   - href: The URL to navigate to when the card is clicked. Defaults to an empty string.
 *   - width: The width of the image in pixels. Defaults to 240.
 *   - height: The height of the image in pixels. Defaults to 360.
 *   - className: The CSS class name(s) to apply to the card. Defaults to an empty string.
 *   - children: The content to display inside the card. Defaults to an empty string.
 * @return {JSX.Element} The rendered card component.
 */
export const Card = ({
  id,
  posterPath,
  href = "",
  width = 240,
  height = 360,
  className,
  children,
}: CardProps): JSX.Element => {
  const figureClasses = twMerge("min-h-full ", className);

  return (
    <li
      key={id}
      className="shrink-0 grow-0 hover:bg-neutral-200 hover:scale-105 transition duration-300 ease-in-out"
    >
      <Link key={id} href={href}>
        <Figure className={figureClasses}>
          <div className={"overflow-show"}>
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
    </li>
  );
};

Card.Footer = Footer;
