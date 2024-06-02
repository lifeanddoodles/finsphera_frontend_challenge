import React from "react";
import { twMerge } from "tailwind-merge";
import { getClasses } from "./utils";

const Heading = ({
  children,
  level = 2,
  className,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const mergedClasses = twMerge(
    `title-font font-medium text-secondary ${getClasses(level)}`,
    className
  );

  return <Tag className={mergedClasses}>{children}</Tag>;
};

export default Heading;
