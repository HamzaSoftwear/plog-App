// src/lib/postInteractions.js
import {
    collection,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  
  /* -------------------- Helpers -------------------- */
  
  // نطبّق توحيد النوع عشان ما تتعارض أرقام Strapi مع نصوص Firestore
  const normalizeId = (v) => String(v);
  
  // نفس نسقك الحالي: postId أولاً ثم userId
  const createDocId = (postId, userId) => `${normalizeId(postId)}_${normalizeId(userId)}`;
  
  /* ==================== LIKES ==================== */
  
  /**
   * Toggle like for a post (idempotent)
   * @param {string|number} postId
   * @param {object} user - must contain uid
   * @returns {Promise<boolean>} true if now liked, false if now unliked
   */
  export const toggleLike = async (postId, user) => {
    if (!user?.uid) throw new Error('User must be authenticated to like posts');
  
    const pid = normalizeId(postId);
    const docId = createDocId(pid, user.uid);
    const likeRef = doc(db, 'likes', docId);
  
    try {
      const likeDoc = await getDoc(likeRef);
      if (likeDoc.exists()) {
        await deleteDoc(likeRef); // ← يحذف فعليًا من Firestore
        return false;
      } else {
        await setDoc(likeRef, {
          postId: pid,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        return true;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  };
  
  /**
   * Check if a post is liked by a user
   * @param {string|number} postId
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  export const isLiked = async (postId, userId) => {
    if (!userId) return false;
  
    const pid = normalizeId(postId);
    const docId = createDocId(pid, userId);
    const likeRef = doc(db, 'likes', docId);
  
    try {
      const likeDoc = await getDoc(likeRef);
      return likeDoc.exists();
    } catch (error) {
      console.error('Error checking like status:', error);
      return false;
    }
  };
  
  /**
   * Get likes count for a post
   * @param {string|number} postId
   * @returns {Promise<number>}
   */
  export const getPostLikesCount = async (postId) => {
    const pid = normalizeId(postId);
    try {
      const likesQuery = query(collection(db, 'likes'), where('postId', '==', pid));
      const likesSnapshot = await getDocs(likesQuery);
      return likesSnapshot.size;
    } catch (error) {
      console.error('Error getting likes count:', error);
      return 0;
    }
  };
  
  /**
   * Get all liked post IDs for a user (newest first when possible)
   * @param {string} userId
   * @returns {Promise<string[]>}
   */
  export const getMyLikedPosts = async (userId) => {
    if (!userId) return [];
  
    try {
      // نحاول مع orderBy أولاً (يتطلب index غالباً)
      try {
        const likesQuery = query(
          collection(db, 'likes'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(likesQuery);
        return snapshot.docs.map((d) => normalizeId(d.data().postId));
      } catch (indexError) {
        console.warn('Index not available for likes, fetching without orderBy:', indexError);
        // Fallback بدون orderBy ونرتّب بالجافاسكربت
        const likesQuery = query(collection(db, 'likes'), where('userId', '==', userId));
        const snapshot = await getDocs(likesQuery);
        const likes = snapshot.docs.map((d) => ({
          postId: normalizeId(d.data().postId),
          createdAt: d.data().createdAt?.toDate?.() || new Date(0),
        }));
        return likes.sort((a, b) => b.createdAt - a.createdAt).map((x) => x.postId);
      }
    } catch (error) {
      console.error('Error getting liked posts:', error);
      return [];
    }
  };
  
  /* ==================== SAVES ==================== */
  
  /**
   * Toggle save for a post (idempotent)
   * @param {string|number} postId
   * @param {object} user - must contain uid
   * @returns {Promise<boolean>} true if now saved, false if now unsaved
   */
  export const toggleSave = async (postId, user) => {
    if (!user?.uid) throw new Error('User must be authenticated to save posts');
  
    const pid = normalizeId(postId);
    const docId = createDocId(pid, user.uid);
    const saveRef = doc(db, 'saves', docId);
  
    try {
      const saveDoc = await getDoc(saveRef);
      if (saveDoc.exists()) {
        await deleteDoc(saveRef); // ← يحذف فعليًا من Firestore
        return false;
      } else {
        await setDoc(saveRef, {
          postId: pid,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        return true;
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      throw error;
    }
  };
  
  /**
   * Check if a post is saved by a user
   * @param {string|number} postId
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  export const isSaved = async (postId, userId) => {
    if (!userId) return false;
  
    const pid = normalizeId(postId);
    const docId = createDocId(pid, userId);
    const saveRef = doc(db, 'saves', docId);
  
    try {
      const saveDoc = await getDoc(saveRef);
      return saveDoc.exists();
    } catch (error) {
      console.error('Error checking save status:', error);
      return false;
    }
  };
  
  /**
   * Get all saved post IDs for a user (newest first when possible)
   * @param {string} userId
   * @returns {Promise<string[]>}
   */
  export const getMySavedPosts = async (userId) => {
    if (!userId) return [];
  
    try {
      // نحاول مع orderBy أولاً (يتطلب index غالباً)
      try {
        const savesQuery = query(
          collection(db, 'saves'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(savesQuery);
        return snapshot.docs.map((d) => normalizeId(d.data().postId));
      } catch (indexError) {
        console.warn('Index not available for saves, fetching without orderBy:', indexError);
        // Fallback بدون orderBy ونرتّب بالجافاسكربت
        const savesQuery = query(collection(db, 'saves'), where('userId', '==', userId));
        const snapshot = await getDocs(savesQuery);
        const saves = snapshot.docs.map((d) => ({
          postId: normalizeId(d.data().postId),
          createdAt: d.data().createdAt?.toDate?.() || new Date(0),
        }));
        return saves.sort((a, b) => b.createdAt - a.createdAt).map((x) => x.postId);
      }
    } catch (error) {
      console.error('Error getting saved posts:', error);
      return [];
    }
  };
  
  /* ==================== COMMENTS ==================== */
  
  /**
   * Add a comment to a post
   * @param {string|number} postId
   * @param {object} user - must contain uid, name/email optional
   * @param {string} text
   * @returns {Promise<string>} comment doc id
   */
  export const addComment = async (postId, user, text) => {
    if (!user?.uid) throw new Error('User must be authenticated to comment');
    if (!text?.trim()) throw new Error('Comment text cannot be empty');
  
    const pid = normalizeId(postId);
  
    try {
      const commentData = {
        postId: pid,
        userId: user.uid,
        userName: user.name || user.displayName || user.email || 'Anonymous',
        userPhoto: user.photoURL || null,
        text: text.trim(),
        createdAt: serverTimestamp(),
      };
  
      const docRef = await addDoc(collection(db, 'comments'), commentData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };
  
  /**
   * Get all comments for a post (ascending by createdAt when possible)
   * @param {string|number} postId
   * @returns {Promise<Array>}
   */
  export const getPostComments = async (postId) => {
    const pid = normalizeId(postId);
  
    try {
      // نحاول مع orderBy أولاً
      try {
        const commentsQuery = query(
          collection(db, 'comments'),
          where('postId', '==', pid),
          orderBy('createdAt', 'asc')
        );
        const snapshot = await getDocs(commentsQuery);
        return snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.() || new Date(0),
        }));
      } catch (indexError) {
        console.warn('Index not available for comments, fetching without orderBy:', indexError);
        // Fallback بدون orderBy ونرتّب بالجافاسكربت
        const commentsQuery = query(collection(db, 'comments'), where('postId', '==', pid));
        const snapshot = await getDocs(commentsQuery);
        const comments = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.() || new Date(0),
        }));
        return comments.sort((a, b) => a.createdAt - b.createdAt);
      }
    } catch (error) {
      console.error('Error getting comments:', error);
      return [];
    }
  };
  
  /**
   * Delete a comment (only author can delete)
   * @param {string} commentId
   * @param {string} userId
   */
  export const deleteComment = async (commentId, userId) => {
    if (!userId) throw new Error('User must be authenticated to delete comments');
  
    try {
      const commentRef = doc(db, 'comments', commentId);
      const commentDoc = await getDoc(commentRef);
  
      if (!commentDoc.exists()) throw new Error('Comment not found');
      if (normalizeId(commentDoc.data().userId) !== normalizeId(userId)) {
        throw new Error('You can only delete your own comments');
      }
  
      await deleteDoc(commentRef);
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };
  