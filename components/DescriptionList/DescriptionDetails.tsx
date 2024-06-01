import React from "react";

export const DescriptionDetails = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <dd>{children}</dd>;
};
