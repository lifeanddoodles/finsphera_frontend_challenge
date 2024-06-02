import { Dispatch, SetStateAction } from "react";
import TabList from "./TabList";
export * from "./TabPanel";

const TabPanels = ({
  tabs,
  children,
  activeTab,
  setActiveTab,
}: {
  tabs: { name: string; controls: string }[];
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <section className="px-6 mb-10">
      <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {children}
    </section>
  );
};

export default TabPanels;
