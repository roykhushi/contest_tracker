import { useState, useEffect } from 'react';
import { fetchCodeforces, fetchCodechef, fetchLeetcode } from '../services/api';
import { isAfter, subWeeks } from 'date-fns';

export const useContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Codeforces', 'CodeChef', 'LeetCode']);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const [codeforcesContests, codechefContests, leetcodeContests] = await Promise.all([
          fetchCodeforces(),
          fetchCodechef(),
          fetchLeetcode(),
        ]);

        const allContests = [...codeforcesContests, ...codechefContests, ...leetcodeContests];
        setContests(allContests);
      } catch (err) {
        setError('Failed to fetch contests');
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const filteredContests = contests.filter(contest => 
    selectedPlatforms.includes(contest.platform)
  );

  const upcomingContests = filteredContests.filter(contest =>
    isAfter(new Date(contest.startTime), new Date())
  );

  const pastContests = filteredContests.filter(contest => {
    const contestDate = new Date(contest.startTime);
    const oneWeekAgo = subWeeks(new Date(), 1);
    return contestDate >= oneWeekAgo && contestDate <= new Date();
  });

  return {
    upcomingContests,
    pastContests,
    loading,
    error,
    selectedPlatforms,
    setSelectedPlatforms,
  };
};