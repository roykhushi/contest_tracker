import React from 'react';

export default function PlatformFilter({ selectedPlatforms, onChange }) {
  const platforms = [
    { key: 'codeforces.com', label: 'Codeforces' },
    { key: 'codechef.com', label: 'CodeChef' },
    { key: 'leetcode.com', label: 'LeetCode' },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter Platforms</h3>
      <div className="flex gap-4">
        {platforms.map(({ key, label }) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selectedPlatforms, key]);
                } else {
                  onChange(selectedPlatforms.filter(p => p !== key));
                }
              }}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
