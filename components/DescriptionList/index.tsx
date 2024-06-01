import React from "react";
export * from "./DescriptionDetails";
export * from "./DescriptionTerm";

const DescriptionList = ({ children }: { children: React.ReactNode }) => {
  return <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</dl>;
};

export default DescriptionList;
