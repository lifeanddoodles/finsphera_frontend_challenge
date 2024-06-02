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
    <ul role="tablist" className="flex gap-4 justify-center mb-8">
      {tabs.map((tab) => (
        <li
          role="tab"
          key={tab.name}
          aria-controls={tab.controls}
          aria-selected={tab.name === activeTab}
          onClick={() => setActiveTab(tab.name)}
          className="cursor-pointer text-center text-lg text-primary hover:text-primary-dark transition duration-300 ease-in-out"
        >
          {tab.name.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};

export default TabList;
