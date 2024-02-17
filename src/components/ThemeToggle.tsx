import React from 'react'
import { useTheme } from './ThemeProvider'

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Tema Claro' : 'Tema Escuro'}
    </button>
  )
}

export default ThemeToggle
