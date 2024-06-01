import { Dispatch, SetStateAction } from "react";

const TabList = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { name: string; controls: string }[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <ul role="tablist" className="flex gap-4 justify-center">
      {tabs.map((tab) => (
        <li
          role="tab"
          key={tab.name}
          aria-controls={tab.controls}
          aria-selected={tab.name === activeTab}
          onClick={() => setActiveTab(tab.name)}
          className="cursor-pointer text-center text-lg"
        >
          {tab.name.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};

export default TabList;
