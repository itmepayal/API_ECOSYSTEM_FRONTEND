import { memo } from "react";
import { motion } from "framer-motion";

type Tab = "JavaScript" | "Python" | "cURL";

type PlaygroundTabsProps = {
  tabs: Tab[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

export const PlaygroundTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: PlaygroundTabsProps) => {
  return (
    <div className="flex border-b border-[#242424] relative">
      {tabs.map((tab) => (
        <motion.button
          whileTap={{ scale: 0.95 }}
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="flex-1 text-sm py-3 text-center font-medium text-white/60 hover:text-white relative"
        >
          {tab}

          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
