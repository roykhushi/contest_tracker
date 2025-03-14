import React from 'react';

export default function PlatformFilter({ selectedPlatforms, onChange }) {
  const platforms = ['Codeforces', 'CodeChef', 'LeetCode'];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter Platforms</h3>
      <div className="flex gap-4">
        {platforms.map(platform => (
          <label key={platform} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selectedPlatforms, platform]);
                } else {
                  onChange(selectedPlatforms.filter(p => p !== platform));
                }
              }}
              className="mr-2"
            />
            {platform}
          </label>
        ))}
      </div>
    </div>
  );
}