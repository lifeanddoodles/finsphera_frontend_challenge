import React from "react";
import { twMerge } from "tailwind-merge";
export * from "./Figcaption";

const Figure = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const classes = twMerge("grid gap-2", className);

  return <figure className={classes}>{children}</figure>;
};

export default Figure;
