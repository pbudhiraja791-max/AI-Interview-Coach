import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ai_coach_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const res = await api.auth.getProfile();
          setUser(res.user);
        } catch (err) {
          console.warn("Session expired or invalid token:", err);
          logout();
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const res = await api.auth.login(credentials);
    localStorage.setItem('ai_coach_token', res.token);
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const register = async (userData) => {
    const res = await api.auth.register(userData);
    localStorage.setItem('ai_coach_token', res.token);
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const demoLogin = async () => {
    const res = await api.auth.demoLogin();
    localStorage.setItem('ai_coach_token', res.token);
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('ai_coach_token');
    setToken(null);
    setUser(null);
  };

  const updateUserProfile = async (updates) => {
    const res = await api.auth.updateProfile(updates);
    setUser(res.user);
    return res.user;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      demoLogin,
      logout,
      updateUserProfile,
      isAuthenticated: Boolean(user)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
