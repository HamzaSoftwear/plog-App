import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'post_prefs';

const PostPrefsContext = createContext(null);

export function PostPrefsProvider({ children }) {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState({ likes: {}, bookmarks: {} });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPrefs(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  const getUserKey = () => (user?.id || 'anonymous');

  const isLiked = (postId) => Boolean(prefs.likes[getUserKey()]?.[postId]);
  const isBookmarked = (postId) => Boolean(prefs.bookmarks[getUserKey()]?.[postId]);

  const toggleLike = (postId) => {
    const key = getUserKey();
    setPrefs((prev) => {
      const next = { ...prev, likes: { ...prev.likes } };
      const userLikes = { ...(next.likes[key] || {}) };
      userLikes[postId] = !userLikes[postId];
      next.likes[key] = userLikes;
      return next;
    });
  };

  const toggleBookmark = (postId) => {
    const key = getUserKey();
    setPrefs((prev) => {
      const next = { ...prev, bookmarks: { ...prev.bookmarks } };
      const userBookmarks = { ...(next.bookmarks[key] || {}) };
      userBookmarks[postId] = !userBookmarks[postId];
      next.bookmarks[key] = userBookmarks;
      return next;
    });
  };

  const value = useMemo(
    () => ({ isLiked, isBookmarked, toggleLike, toggleBookmark }),
    [prefs, user]
  );

  return <PostPrefsContext.Provider value={value}>{children}</PostPrefsContext.Provider>;
}

export function usePostPrefs() {
  const ctx = useContext(PostPrefsContext);
  if (!ctx) throw new Error('usePostPrefs must be used within PostPrefsProvider');
  return ctx;
}





