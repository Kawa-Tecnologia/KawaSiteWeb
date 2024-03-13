import React from 'react'
import ReactDOM from 'react-dom' 
import RoutesApp from './Routes'
import './style.css'
import { ThemeProvider } from './components/ThemeProvider'
import Modal from 'react-modal';

const rootElement: HTMLElement | null = document.getElementById('root')
Modal.setAppElement('#root');

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
