import Text from "@/components/Text";
import { Dispatch, SetStateAction } from "react";

/**
 * Renders a list of tabs with their respective controls and allows the user to switch between tabs.
 *
 * @param {Array<{name: string, controls: string}>} tabs - The array of tabs to be rendered.
 * @param {string} activeTab - The currently active tab.
 * @param {Function} setActiveTab - The function to set the active tab.
 * @return {JSX.Element} The rendered tab list.
 */
const TabList = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { name: string; controls: string }[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
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
