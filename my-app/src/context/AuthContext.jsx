import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'auth_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }, [user]);

  const login = (email, password) => {
    // Demo-only login: accept any non-empty creds
    const nextUser = { id: email, email, name: email.split('@')[0], avatarUrl: '' };
    setUser(nextUser);
    return nextUser;
  };

  const register = (name, email, password) => {
    const nextUser = { id: email, email, name, avatarUrl: '' };
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => setUser(null);

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const value = useMemo(
    () => ({ user, login, register, logout, updateProfile }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}



