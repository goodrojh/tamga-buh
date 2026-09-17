import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Сайт всегда открывается с самого начала, а не с сохранённой позиции скролла
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (!location.hash) window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
