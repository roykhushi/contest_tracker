import axios from 'axios';

// const CODEFORCES_API = 'https://codeforces.com/api/contest.list';
// const CODECHEF_API = 'https://www.codechef.com/api/list/contests/all';
// const LEETCODE_API = 'https://leetcode.com/graphql';

// export const fetchCodeforces = async () => {
//   try {
//     const response = await axios.get(CODEFORCES_API);
//     return response.data.result.map(contest => ({
//       id: `cf_${contest.id}`,
//       name: contest.name,
//       platform: 'Codeforces',
//       startTime: contest.startTimeSeconds * 1000,
//       duration: contest.durationSeconds * 1000,
//       url: `https://codeforces.com/contest/${contest.id}`,
//     }));
//   } catch (error) {
//     console.error('Error fetching Codeforces contests:', error);
//     return [];
//   }
// };

// export const fetchCodechef = async () => {
//   try {
//     const response = await axios.get(CODECHEF_API);
//     const contests = [...response.data.future_contests, ...response.data.present_contests];
//     return contests.map(contest => ({
//       id: `cc_${contest.code}`,
//       name: contest.name,
//       platform: 'CodeChef',
//       startTime: new Date(contest.start_date).getTime(),
//       duration: contest.duration * 60 * 60 * 1000,
//       url: `https://www.codechef.com/${contest.code}`,
//     }));
//   } catch (error) {
//     console.error('Error fetching CodeChef contests:', error);
//     return [];
//   }
// };

// export const fetchLeetcode = async () => {
//   const query = `
//     query {
//       allContests {
//         title
//         titleSlug
//         startTime
//         duration
//       }
//     }
//   `;

//   try {
//     const response = await axios.post(LEETCODE_API, { query });
//     return response.data.data.allContests.map(contest => ({
//       id: `lc_${contest.titleSlug}`,
//       name: contest.title,
//       platform: 'LeetCode',
//       startTime: contest.startTime * 1000,
//       duration: contest.duration * 1000,
//       url: `https://leetcode.com/contest/${contest.titleSlug}`,
//     }));
//   } catch (error) {
//     console.error('Error fetching LeetCode contests:', error);
//     return [];
//   }
// };


// const CLIST_API = 'https://clist.by/api/v4/doc/';
// const API_KEY = 'roykhushi:a02da41f127f8d2be997fb4ae99f211d20593217';

// export const fetchClistContests = async () => {
//   try {
//     const response = await axios.get(CLIST_API, {
//       headers: {
//         Authorization: `ApiKey ${API_KEY}`,
//       },
//       params: {
//         resource: 'codeforces.com',
//         upcoming: true,
//         limit: 10,
//       },
//     });

//     return response.data.objects.map(contest => ({
//       id: `cf_${contest.id}`,
//       name: contest.event,
//       platform: contest.resource.name,
//       startTime: new Date(contest.start).getTime(),
//       duration: contest.duration * 1000,
//       url: contest.href,
//     }));
//   } catch (error) {
//     console.error('Error fetching Codeforces contests:', error.response?.data || error.message);
//     return [];
//   }
// };



export const fetchClistContests = async () => {
  try {
    const response = await axios.get(CLIST_API, {
      headers: {
        Authorization: `ApiKey ${API_KEY}`,
      },
      params: {
        upcoming: true,
        limit: 200,
      },
    });

    // console.log('api resp',response.data);
    console.log("api:",response.data.objects[0]);
    return response.data.objects.map(contest => ({
      id: `${contest.id}`,
      name: contest.event,
      platform: contest.host,
      startTime: new Date(contest.start).getTime(),
      duration: contest.duration * 1000,
      url: contest.href,
    }));
  } catch (error) {
    console.error('Error fetching contests:', error.response?.data || error.message);
    return [];
  }
};
