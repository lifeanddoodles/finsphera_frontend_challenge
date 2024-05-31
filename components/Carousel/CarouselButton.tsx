import Button from "@/components/Button";
import Image from "next/image";

export const CarouselButton = ({
  ariaLabel,
  onClick,
  direction,
}: {
  ariaLabel: string;
  onClick: () => void;
  direction: "left" | "right";
}) => {
  return (
    <Button
      ariaLabel={ariaLabel}
      variant="ghost"
      className={`absolute top-0 bottom-0 ${direction}-0 text-xl text-white rounded-none m-0 opacity-0 hover:text-white hover:opacity-100 hover:bg-[#00000080] transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {direction === "left" ? (
        <Image
          src="/chevron-left.svg"
          className="filter invert"
          width={24}
          height={24}
          alt=""
        />
      ) : (
        <Image
          src="/chevron-right.svg"
          className="filter invert"
          width={24}
          height={24}
          alt=""
        />
      )}
    </Button>
  );
};
