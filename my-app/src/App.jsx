import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogDetail from './pages/BlogDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'  

export default function App() {
  return (
    <AuthProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
