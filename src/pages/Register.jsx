import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Register.css'

export default function Register() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [jsonOutput, setJsonOutput] = useState(null)
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', cidade: '', estado: '', bio: '', github: '', dataNascimento: ''
  })

  useEffect(() => {
    if (user) setFormData(prev => ({ ...prev, nome: user.name || '', email: user.email || '' }))
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = { ...formData, fotoPerfil: user?.picture || null, dataCadastro: new Date().toISOString(), autenticadoVia: 'Google OAuth 2.0' }
    setJsonOutput(userData)
    setSubmitted(true)
    console.log('Dados do usuário cadastrado (JSON):')
    console.log(JSON.stringify(userData, null, 2))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setSubmitted(false)
    setJsonOutput(null)
    if (user) setFormData({ nome: user.name || '', email: user.email || '', telefone: '', cidade: '', estado: '', bio: '', github: '', dataNascimento: '' })
  }

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="register-page" id="register-page">
      <nav className="team-nav">
        <div className="team-nav-logo">
        </div>
        <div className="team-nav-links">
          <Link to="/equipe" className="team-nav-link">Equipe</Link>
          <Link to="/cadastro" className="team-nav-link active">Cadastro</Link>
        </div>
        <div className="team-nav-right">
          {user?.picture && <img src={user.picture} alt={user.name} className="team-nav-avatar" referrerPolicy="no-referrer" />}
          <span className="team-nav-name">{user?.name?.split(' ')[0]}</span>
          <button className="team-nav-logout" onClick={handleLogout} id="logout-btn">Sair</button>
        </div>
      </nav>

      <div className="register-content-area">
        <div className="register-inner">
          <div className="register-header">
            <h1 className="register-title"><span className="text-gradient">Cadastro</span></h1>
            <p className="register-subtitle">Preencha seus dados para completar o registro</p>
          </div>

          <div className="register-card">
            <div className="register-notice">
              <span className="register-notice-dot" />
              Nome e e-mail pré-preenchidos com sua conta Google
            </div>

            <form className="register-form" onSubmit={handleSubmit} id="register-form">
              <div className="register-divider">Dados pessoais</div>
              <div className="register-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="nome">Nome completo</label>
                  <input type="text" id="nome" name="nome" className="form-input" value={formData.nome} onChange={handleChange} placeholder="Seu nome" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required />
                </div>
              </div>
              <div className="register-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="telefone">Telefone</label>
                  <input type="tel" id="telefone" name="telefone" className="form-input" value={formData.telefone} onChange={handleChange} placeholder="(00) 00000-0000" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="dataNascimento">Data de nascimento</label>
                  <input type="date" id="dataNascimento" name="dataNascimento" className="form-input" value={formData.dataNascimento} onChange={handleChange} />
                </div>
              </div>

              <div className="register-divider">Localização</div>
              <div className="register-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="cidade">Cidade</label>
                  <input type="text" id="cidade" name="cidade" className="form-input" value={formData.cidade} onChange={handleChange} placeholder="Sua cidade" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="estado">Estado</label>
                  <input type="text" id="estado" name="estado" className="form-input" value={formData.estado} onChange={handleChange} placeholder="UF" />
                </div>
              </div>

              <div className="register-divider">Informações extras</div>
              <div className="form-group">
                <label className="form-label" htmlFor="github">GitHub</label>
                <input type="url" id="github" name="github" className="form-input" value={formData.github} onChange={handleChange} placeholder="https://github.com/seu-usuario" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="bio">Sobre você</label>
                <textarea id="bio" name="bio" className="form-input" value={formData.bio} onChange={handleChange} placeholder="Conte um pouco sobre você..." rows="3" style={{ resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                {!submitted ? (
                  <button type="submit" className="btn btn-primary register-submit" id="submit-btn">Finalizar cadastro</button>
                ) : (
                  <>
                    <div className="register-success">Cadastro realizado com sucesso</div>
                    <button type="button" className="btn btn-outline register-submit" onClick={handleReset} id="reset-btn">Novo cadastro</button>
                  </>
                )}
              </div>
            </form>
          </div>

          {jsonOutput && (
            <div className="register-json" id="json-output-section">
              <div className="register-json-head">
                <div className="register-json-label">Dados gerados <span className="register-json-tag">JSON</span></div>
                <button className={`register-json-copy ${copied ? 'copied' : ''}`} onClick={handleCopy} id="copy-json-btn">{copied ? 'Copiado' : 'Copiar'}</button>
              </div>
              <div className="register-json-block">
                <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
