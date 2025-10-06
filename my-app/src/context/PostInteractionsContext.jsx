// src/context/PostInteractionsContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  toggleLike as toggleLikeFirestore,
  isLiked as isLikedFirestore,
  getPostLikesCount,
  toggleSave as toggleSaveFirestore,
  isSaved as isSavedFirestore,
  getPostComments,
  addComment as addCommentFirestore,
} from '../lib/postInteractions';

const PostInteractionsContext = createContext();

export function usePostInteractions() {
  const context = useContext(PostInteractionsContext);
  if (!context) {
    throw new Error('usePostInteractions must be used within PostInteractionsProvider');
  }
  return context;
}

// helper لتوحيد نوع المعرّف
const pid = (v) => String(v);

export function PostInteractionsProvider({ children }) {
  const { user } = useAuth();

  const [interactions, setInteractions] = useState({
    // likes[postId] = { isLiked: boolean, count: number }
    likes: {},
    // saves[postId] = boolean
    saves: {},
    // comments[postId] = Array<Comment>
    comments: {},
  });

  // خريطة تحميل البيانات من السيرفر (للتوافق مع اسمك السابق "loading")
  const [loading, setLoading] = useState({});
  // خريطة الحالات الجارية لمنع النقر المزدوج أثناء toggle
  // pending[postId] = { like?: boolean, save?: boolean }
  const [pending, setPending] = useState({});

  const setLoadingFlag = (postId, value) =>
    setLoading((prev) => ({ ...prev, [postId]: value }));

  const setPendingFlag = (postId, key, value) =>
    setPending((p) => ({ ...p, [postId]: { ...(p[postId] || {}), [key]: value } }));

  // تحميل تفاعلات بوست واحد (حالة مؤكّدة من السيرفر)
  const loadPostInteractions = useCallback(
    async (postIdRaw) => {
      const postId = pid(postIdRaw);
      if (!postId) return;

      setLoadingFlag(postId, true);

      try {
        const [liked, saved, likesCount, comments] = await Promise.all([
          user ? isLikedFirestore(postId, user.uid) : false,
          user ? isSavedFirestore(postId, user.uid) : false,
          getPostLikesCount(postId),
          getPostComments(postId),
        ]);

        setInteractions((prev) => ({
          ...prev,
          likes: {
            ...prev.likes,
            [postId]: { isLiked: liked, count: likesCount },
          },
          saves: {
            ...prev.saves,
            [postId]: saved,
          },
          comments: {
            ...prev.comments,
            [postId]: comments,
          },
        }));
      } catch (error) {
        console.error('Error loading post interactions:', error);
      } finally {
        setLoadingFlag(postId, false);
      }
    },
    [user]
  );

  // تبديل اللايك (Optimistic UI)
  const toggleLike = useCallback(
    async (postIdRaw) => {
      if (!user) throw new Error('You must be logged in to like posts');

      const postId = pid(postIdRaw);
      if (pending[postId]?.like) return interactions.likes[postId]?.isLiked ?? false;

      try {
        setPendingFlag(postId, 'like', true);

        // الحالة الحالية
        const current = interactions.likes[postId] || { isLiked: false, count: 0 };
        const optimisticLiked = !current.isLiked;
        const optimisticCount = Math.max(0, current.count + (optimisticLiked ? 1 : -1));

        // تحديث تفاؤلي
        setInteractions((prev) => ({
          ...prev,
          likes: {
            ...prev.likes,
            [postId]: { isLiked: optimisticLiked, count: optimisticCount },
          },
        }));

        // تنفيذ على Firestore (يحذف الوثيقة إذا كانت موجودة والعكس)
        const resultLiked = await toggleLikeFirestore(postId, user);

        // جلب العدد الحقيقي من Firestore لضبط الدقّة
        const serverCount = await getPostLikesCount(postId);

        // تثبيت الحالة النهائية
        setInteractions((prev) => ({
          ...prev,
          likes: {
            ...prev.likes,
            [postId]: { isLiked: resultLiked, count: serverCount },
          },
        }));

        return resultLiked;
      } catch (error) {
        console.error('Error toggling like:', error);
        // تراجع: أعد تحميل حالة هذا البوست من المصدر
        await loadPostInteractions(postId);
        throw error;
      } finally {
        setPendingFlag(postId, 'like', false);
      }
    },
    [user, interactions.likes, pending, loadPostInteractions]
  );

  // تبديل الحفظ (Optimistic UI)
  const toggleSave = useCallback(
    async (postIdRaw) => {
      if (!user) throw new Error('You must be logged in to save posts');

      const postId = pid(postIdRaw);
      if (pending[postId]?.save) return interactions.saves[postId] ?? false;

      try {
        setPendingFlag(postId, 'save', true);

        // الحالة الحالية
        const currentSaved = !!interactions.saves[postId];
        const optimisticSaved = !currentSaved;

        // تحديث تفاؤلي
        setInteractions((prev) => ({
          ...prev,
          saves: {
            ...prev.saves,
            [postId]: optimisticSaved,
          },
        }));

        // تنفيذ على Firestore
        const resultSaved = await toggleSaveFirestore(postId, user);

        // تثبيت الحالة النهائية حسب نتيجة السيرفر
        setInteractions((prev) => ({
          ...prev,
          saves: {
            ...prev.saves,
            [postId]: resultSaved,
          },
        }));

        return resultSaved;
      } catch (error) {
        console.error('Error toggling save:', error);
        // تراجع: أعد تحميل حالة هذا البوست من المصدر
        await loadPostInteractions(postId);
        throw error;
      } finally {
        setPendingFlag(postId, 'save', false);
      }
    },
    [user, interactions.saves, pending, loadPostInteractions]
  );

  // إضافة تعليق (ثم إعادة تحميل التعليقات لثبات العرض)
  const addComment = useCallback(
    async (postIdRaw, text) => {
      if (!user) throw new Error('You must be logged in to comment');

      const postId = pid(postIdRaw);
      try {
        await addCommentFirestore(postId, user, text);
        // أبقيها بسيطة: أعد التحميل الكامل لتوحيد المصدر
        await loadPostInteractions(postId);
      } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
      }
    },
    [user, loadPostInteractions]
  );

  // Getters (متوافقة مع نسختك السابقة)
  const isLiked = useCallback(
    (postIdRaw) => !!interactions.likes[pid(postIdRaw)]?.isLiked,
    [interactions.likes]
  );

  const isSaved = useCallback(
    (postIdRaw) => !!interactions.saves[pid(postIdRaw)],
    [interactions.saves]
  );

  const getLikesCount = useCallback(
    (postIdRaw) => interactions.likes[pid(postIdRaw)]?.count ?? 0,
    [interactions.likes]
  );

  const getComments = useCallback(
    (postIdRaw) => interactions.comments[pid(postIdRaw)] ?? [],
    [interactions.comments]
  );

  const isLoading = useCallback(
    (postIdRaw) => !!loading[pid(postIdRaw)],
    [loading]
  );

  const value = {
    // State
    interactions,
    loading,      // للتوافق مع الاستهلاك الحالي
    pending,      // مفيد لو حبيت تمنع الضغط المزدوج من الواجهات

    // Actions
    loadPostInteractions,
    toggleLike,
    toggleSave,
    addComment,

    // Getters
    isLiked,
    isSaved,
    getLikesCount,
    getComments,
    isLoading,
  };

  return (
    <PostInteractionsContext.Provider value={value}>
      {children}
    </PostInteractionsContext.Provider>
  );
}
