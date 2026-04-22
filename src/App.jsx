import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Team from './pages/Team'
import Register from './pages/Register'

export default function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/equipe" />} />
      <Route path="/equipe" element={user ? <Team /> : <Navigate to="/" />} />
      <Route path="/cadastro" element={user ? <Register /> : <Navigate to="/" />} />
    </Routes>
  )
}
