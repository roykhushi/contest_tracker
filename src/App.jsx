import { useState } from "react";
import { useBookmarks } from "../src/hooks/useBooksmarks.js";
import { useContests } from "../src/hooks/useContests.js";
import ContestCard from "./components/ContestCard";
import PlatformFilter from "./components/PlatformFilter";
import { Toaster } from "react-hot-toast";
import { CodeXml } from "lucide-react";
// import useDarkMode from "../src/hooks/useDarkMode.js";
import ThemeToggle from "./components/ThemeToggle.jsx";

function App() {
  const {
    upcomingContests,
    pastContests,
    loading,
    error,
    selectedPlatforms,
    setSelectedPlatforms,
  } = useContests();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const [showBookmarks, setShowBookmarks] = useState(false);
  // const [showUpcomingContests, setShowUpcomingContests] = useState(true);
  // const [theme, toggleTheme] = useDarkMode();

  // console.log('upcoming',upcomingContests);
  // console.log('past ',pastContests)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-full px-4 py-8 dark:bg-[#1b1b1f]">
      <div className="px-6">
        <div className="mb-2 w-full">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        <Toaster position="top-right" />

        <div className="flex items-center justify-center gap-x-3 mb-8">
          <CodeXml className="w-16 h-16 text-blue-600" />

          <div className="flex flex-col items-start">
            <h1 className="text-6xl font-bold leading-none tracking-tighter dark:text-white">
              Contest Tracker
            </h1>
            <div className="mt-2 h-2 w-56 bg-blue-400 rounded-md" />
          </div>
        </div>

        <div className="flex justify-center items-center mb-8">
          <p className="font-semibold text-xl dark:text-white">
            Stay ahead of the game with instant access to all upcoming contest
            details—everything you need in one place!
          </p>
        </div>

        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => setShowBookmarks(false)}
            className={`px-4 py-2 rounded ${
              !showBookmarks ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All Contests
          </button>

          <button
            onClick={() => setShowBookmarks(true)}
            className={`px-4 py-2 rounded ${
              showBookmarks ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Bookmarked ({bookmarks.length})
          </button>
        </div>

        <div className="flex">
          {!showBookmarks && (
            <PlatformFilter
              selectedPlatforms={selectedPlatforms}
              onChange={setSelectedPlatforms}
            />
          )}
        </div>

        {showBookmarks ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Bookmarked Contests</h2>
            {bookmarks.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                isBookmarked={isBookmarked(contest.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-4 dark:text-white">Upcoming Contests</h1>
              {upcomingContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  isBookmarked={isBookmarked(contest.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Past Contests (Last Week)
              </h2>
              {pastContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  isBookmarked={isBookmarked(contest.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
