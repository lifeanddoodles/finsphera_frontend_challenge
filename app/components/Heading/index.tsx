import React from "react";
import { twMerge } from "tailwind-merge";

const getClasses = (level: number) => {
  switch (level) {
    case 1:
      return "text-3xl xl:text-4xl";
    case 3:
      return "text-xl";
    case 4:
      return "text-lg";
    case 2:
    default:
      return "text-2xl";
  }
};

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
    `title-font text-neutral-900 dark:text-white font-medium ${getClasses(
      level
    )}`,
    className
  );

  return <Tag className={mergedClasses}>{children}</Tag>;
};

export default Heading;
