import Button from "@/components/Button";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const CarouselButton = ({
  ariaLabel,
  onClick,
  direction,
  className,
}: {
  ariaLabel: string;
  onClick: () => void;
  direction: "left" | "right";
  className: string;
}) => {
  const classes = twMerge(
    `absolute top-0 bottom-0 text-xl text-white rounded-none m-0 opacity-0 hover:text-white hover:opacity-100 hover:bg-[#00000080] transition duration-300 ease-in-out`,
    className
  );
  return (
    <Button
      ariaLabel={ariaLabel}
      variant="ghost"
      className={classes}
      onClick={onClick}
    >
      {direction === "left" ? (
        <Image
          src="/chevron-left.svg"
          className="filter invert"
          width={24}
          height={24 * 1.6}
          alt=""
        />
      ) : (
        <Image
          src="/chevron-right.svg"
          className="filter invert"
          width={24}
          height={24 * 1.6}
          alt=""
        />
      )}
    </Button>
  );
};
