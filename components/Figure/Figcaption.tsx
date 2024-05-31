import React from "react";

export const Figcaption = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <figcaption className={className}>{children}</figcaption>;
};
