import Text from "@/components/Text";
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
          <Text
            as="span"
            className={`hover:border-b-2 hover:border-primary-light ${tab.name === activeTab ? "border-b-2 border-primary" : ""}`}
          >
            {tab.name.toUpperCase()}
          </Text>
        </li>
      ))}
    </ul>
  );
};

export default TabList;
