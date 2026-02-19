import { Navigate, Route, Routes } from 'react-router-dom'
import { getCurrentUser } from './lib/authStorage'
import './App.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'
import Signup from './pages/Signup.jsx'

function ProtectedRoute({ children }) {
  const user = getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
