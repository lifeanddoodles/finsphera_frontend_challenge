import { twMerge } from "tailwind-merge";
import { TextProps } from "./Text.types";

const Heading = ({
  children,
  as = "p",
  size = "base",
  className,
}: TextProps) => {
  const Tag = `${as}` as keyof JSX.IntrinsicElements;
  const mergedClasses = twMerge(`font-normal text-${size}`, className);

  return <Tag className={mergedClasses}>{children}</Tag>;
};

export default Heading;
