import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('ai_coach_gemini_key') || '');

  const saveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('ai_coach_gemini_key', key);
    } else {
      localStorage.removeItem('ai_coach_gemini_key');
    }
  };

  return (
    <ThemeContext.Provider value={{
      apiKey,
      saveApiKey
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
