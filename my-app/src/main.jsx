import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostPrefsProvider } from './context/PostPrefsContext.jsx'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <AuthProvider>
      <PostPrefsProvider>
        <App />
      </PostPrefsProvider>
    </AuthProvider>
  </React.StrictMode>
)
