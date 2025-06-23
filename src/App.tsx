import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </HashRouter>
  )
}
