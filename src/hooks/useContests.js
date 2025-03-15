// import { useState, useEffect } from 'react';
// import { fetchCodeforces, fetchCodechef, fetchLeetcode } from '../services/api';
// import { isAfter, subWeeks } from 'date-fns';

// export const useContests = () => {
//   const [contests, setContests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPlatforms, setSelectedPlatforms] = useState(['Codeforces', 'CodeChef', 'LeetCode']);

//   useEffect(() => {
//     const fetchContests = async () => {
//       try {
//         setLoading(true);
//         const [codeforcesContests, codechefContests, leetcodeContests] = await Promise.all([
//           fetchCodeforces(),
//           fetchCodechef(),
//           fetchLeetcode(),
//         ]);

//         const allContests = [...codeforcesContests, ...codechefContests, ...leetcodeContests];
//         setContests(allContests);
//       } catch (err) {
//         setError('Failed to fetch contests');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContests();
//   }, []);

//   const filteredContests = contests.filter(contest => 
//     selectedPlatforms.includes(contest.platform)
//   );

//   const upcomingContests = filteredContests.filter(contest =>
//     isAfter(new Date(contest.startTime), new Date())
//   );

//   const pastContests = filteredContests.filter(contest => {
//     const contestDate = new Date(contest.startTime);
//     const oneWeekAgo = subWeeks(new Date(), 1);
//     return contestDate >= oneWeekAgo && contestDate <= new Date();
//   });

//   return {
//     upcomingContests,
//     pastContests,
//     loading,
//     error,
//     selectedPlatforms,
//     setSelectedPlatforms,
//   };
// };



import { useState, useEffect } from 'react';
import { fetchClistContests } from '../services/api';
import { isAfter, subWeeks } from 'date-fns';


export const useContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    'codeforces.com',
    'codechef.com',
    'leetcode.com',
  ]);
  
  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const clistContests = await fetchClistContests();
        console.log('set contests', clistContests);
        setContests(clistContests);
      } catch (err) {
        setError('Failed to fetch contests');
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const now = Date.now();
  const oneWeekAgo = subWeeks(new Date(), 1).getTime();
  console.log('Contest Platforms:', contests.map(c => c.platform));


  const upcomingContests = contests.filter(contest => contest.startTime > now);

  const filteredContests = contests.filter((contest) =>
    contest.platform && selectedPlatforms.includes(contest.platform.toLowerCase())
  );
  
  

  const pastContests = contests.filter(contest =>
    contest.startTime >= oneWeekAgo && contest.startTime <= now
  );

  return {
    upcomingContests,
    filteredContests,
    pastContests,
    loading,
    error,
    setContests,
    selectedPlatforms,
    setSelectedPlatforms,
  };
};


