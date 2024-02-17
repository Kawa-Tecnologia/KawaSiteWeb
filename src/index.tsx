import React from 'react'
import ReactDOM from 'react-dom' // Importe ReactDOM
import RoutesApp from './Routes'
import './style.css'
import { ThemeProvider } from './components/ThemeProvider'

const rootElement: HTMLElement | null = document.getElementById('root')

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <div>
        <RoutesApp />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement,
)
