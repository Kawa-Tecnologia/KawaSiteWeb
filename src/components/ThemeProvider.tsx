import React, { createContext, useContext, useState } from 'react'
interface ThemeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}
export const ThemeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  const contextValue: ThemeContextType = {
    darkMode,
    toggleDarkMode,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
