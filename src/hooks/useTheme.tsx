import { useState, useEffect } from 'react';
import { ThemeType } from '../types';
import { getTheme, saveTheme } from '../utils/localStorage';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('light');

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = getTheme() as ThemeType;
    setTheme(savedTheme);
    updateDocumentClass(savedTheme);
  }, []);

  // Update document class for theme
  const updateDocumentClass = (newTheme: ThemeType) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
    updateDocumentClass(newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};