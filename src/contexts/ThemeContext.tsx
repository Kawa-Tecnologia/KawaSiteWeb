import React, { createContext, useContext, useState } from 'react'

interface ThemeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  const value: ThemeContextType = {
    darkMode,
    toggleDarkMode,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
