import React, { createContext, useContext, useState } from 'react'

// Definindo o tipo do contexto
interface ThemeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
}

// Criando o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Hook para usar o contexto
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}

// Componente provedor de tema
export const ThemeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  // Definindo o valor do contexto
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
