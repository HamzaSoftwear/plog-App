// AuthContext.jsx
import React, { useContext, useEffect, useState, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as fbUpdateProfile,   // 👈 اسم مستعار
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Register
  const register = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await fbUpdateProfile(result.user, { displayName: name });
    // حدّث الحالة فوراً
    setUser({
      uid: result.user.uid,
      name,
      email: result.user.email,
      photoURL: result.user.photoURL ?? null,
    });
  };

  // Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // onAuthStateChanged سيحدّث الحالة
  };

  // 👇 دالة تحديث الاسم التي يحتاجها Profile.jsx
  const updateProfile = async ({ name }) => {
    if (!auth.currentUser) return;
    await fbUpdateProfile(auth.currentUser, { displayName: name });
    setUser((prev) => (prev ? { ...prev, name } : prev));
  };

  const logout = () => signOut(auth);

  const value = { user, register, login, logout, loginWithGoogle, updateProfile };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
