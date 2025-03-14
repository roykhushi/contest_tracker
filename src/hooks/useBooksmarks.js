import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('contest-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('contest-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (contest) => {
    setBookmarks(prev => {
      const isBookmarked = prev.some(b => b.id === contest.id);
      if (isBookmarked) {
        return prev.filter(b => b.id !== contest.id);
      } else {
        return [...prev, contest];
      }
    });
  };

  const isBookmarked = (contestId) => {
    return bookmarks.some(b => b.id === contestId);
  };

  return { bookmarks, toggleBookmark, isBookmarked };
};