import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Tema Claro' : 'Tema Escuro'}
    </button>
  );
};

export default ThemeToggle;