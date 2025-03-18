import { formatDistanceToNow, format } from 'date-fns';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';


export default function ContestCard({ contest, isBookmarked, onToggleBookmark, solutionLink }) {
  const startDate = new Date(contest.startTime);
  const timeRemaining = formatDistanceToNow(startDate, { addSuffix: true });

  return (
    <div className="bg-white rounded-xl shadow-xl border-black p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{contest.name}</h3>
          <p className="text-sm text-gray-600">{contest.platform}</p>
        </div>
        <button
          onClick={() => onToggleBookmark(contest)}
          className="text-gray-600 hover:text-yellow-500"
        >
          {isBookmarked ? (
            <BookmarkSolid className="h-6 w-6 text-yellow-500" />
          ) : (
            <BookmarkOutline className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="mt-2">
        <p className="text-sm">
          Start: {format(startDate, 'PPP pp')}
        </p>
        <p className="text-sm text-gray-600">
          {timeRemaining}
        </p>
        <div className="mt-2 flex gap-2">
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Visit 
          </a>
          {solutionLink && (
            <a
              href={solutionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 text-sm"
            >
              Solution Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
}