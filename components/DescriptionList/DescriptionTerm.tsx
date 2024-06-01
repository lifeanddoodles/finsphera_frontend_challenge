import React from "react";

export const DescriptionTerm = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <dt>{children}</dt>;
};
