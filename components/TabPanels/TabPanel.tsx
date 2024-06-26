import React from "react";

export const TabPanel = ({
  id,
  children,
  activeTab,
}: {
  id: string;
  children: React.ReactNode;
  activeTab: string;
}) => {
  return (
    <section
      id={id}
      role="tabpanel"
      className={`flex flex-col items-center ${`panel-${activeTab?.toLowerCase()}` === id ? "" : "hidden"}`}
    >
      {children}
    </section>
  );
};
