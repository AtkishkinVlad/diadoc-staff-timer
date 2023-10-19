import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { THEME_2022_DARK, ThemeContext } from '@skbkontur/react-ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContext.Provider value={THEME_2022_DARK}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
)
