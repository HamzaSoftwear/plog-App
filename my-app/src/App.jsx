import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogDetail from './pages/BlogDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Saved from './pages/Saved'
import Liked from './pages/Liked'
import { AuthProvider } from './context/AuthContext'
import { PostInteractionsProvider } from './context/PostInteractionsContext'  

export default function App() {
  return (
    <AuthProvider>  
      <PostInteractionsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/liked" element={<Liked />} />
          </Routes>
        </Router>
      </PostInteractionsProvider>
    </AuthProvider>
  )
}
