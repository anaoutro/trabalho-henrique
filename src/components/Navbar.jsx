import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo" id="logo-link">
        </NavLink>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          id="menu-toggle"
        >
          <span /><span /><span />
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
            id="nav-home"
            end
          >
            Início
          </NavLink>
          <NavLink
            to="/equipe"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
            id="nav-team"
          >
            Equipe
          </NavLink>
          {user && (
            <NavLink
              to="/cadastro"
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              id="nav-register"
            >
              Cadastro
            </NavLink>
          )}
        </div>

        {user && (
          <div className="navbar-user">
            {user.picture && (
              <img src={user.picture} alt={user.name} className="navbar-avatar" referrerPolicy="no-referrer" />
            )}
            <span className="navbar-username">{user.name?.split(' ')[0]}</span>
            <button className="navbar-logout" onClick={handleLogout} id="logout-btn">
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
