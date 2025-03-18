import React, { useState } from "react";
import { Check } from "lucide-react";

export default function PlatformFilter() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([])

  const platforms = [
    { id: "codeforces.com", name: "Codeforces" },
    { id: "codechef.com", name: "CodeChef" },
    { id: "leetcode.com", name: "LeetCode" },
  ];

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const selectAll = () => {
    setSelectedPlatforms(platforms.map((p) => p.id));
  };

  return (
    <div className="flex flex-col space-y-2 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium dark:text-white">Filter Platforms:</h2>
        <button
          onClick={selectAll}
          className="text-sm text-blue-600 hover:underline"
        >
          Select All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <span
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`cursor-pointer text-sm py-1.5 px-3 rounded-full border transition ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              } flex items-center gap-1`}
            >
              {platform.name}
              {isSelected && <Check className="h-3 w-3" />}
            </span>
          );
        })}
      </div>
    </div>
  );
}
