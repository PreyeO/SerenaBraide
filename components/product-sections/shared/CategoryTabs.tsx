"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// ✅ Define prop types for CategoryTabs
interface CategoryTabsProps {
  category: string;
  onTabChange: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryTabs = ({ category, onTabChange }: CategoryTabsProps) => {
  // ✅ Define different tab options for each category
  const tabOptions: Record<string, string[]> = {
    fragrances: ["All Fragrance", "Men", "Women", "Teens"],
    lips: ["Lip Gloss", "Lip Sticks", "Lip Liners", "Lip Care"],
    "best-sellers": ["Fragrance", "Lip Makeup", "Skin Care"],
    skincare: ["Moisturizers", "Cleansers", "Serums", "All Skincare"],
  };

  // ✅ Select which tabs to display based on the category
  const tabs = tabOptions[category] || ["All"];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Tabs
      defaultValue={tabs[0]}
      className="w-full flex justify-center"
      onValueChange={(value) => {
        setActiveTab(value);
        onTabChange(value);
      }}
    >
      <TabsList className=" text-sm font-normal flex gap-[5px] w-[386px] h-[50px] rounded-full !bg-[#12121226] !text-[#6F6E6C]">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="px-4 py-2 rounded-full transition
             data-[state=active]:!bg-black
             data-[state=active]:!text-white"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
