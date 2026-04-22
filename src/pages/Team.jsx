import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Team.css'


const members = [
  {
    id: 'ana-maria',
    name: 'Ana Maria do Céu Gomes',
    initials: 'AM',
    role: 'Desenvolvedora Full Stack',
    photo: '/ana.jpg',
    bio: 'Foco em dados, Machine Learning e Inteligência Artificial. Especialista em 3D e animações web com WebGL e Three.js.',
    skills: ['Python', 'ML', 'IA', 'WebGL', 'Three.js', '3D'],
  },
  {
    id: 'joao-victor',
    name: 'João Victor Garciano',
    initials: 'JV',
    role: 'Desenvolvedor Backend',
    photo: '/joao.jpg',
    bio: 'Foco em Backend, cursando profissionalizante na Rocketseat. Especializado em Java, APIs RESTful e arquitetura de sistemas.',
    skills: ['Java', 'Spring Boot', 'API REST', 'SQL', 'Node.js', 'Git'],
  }
]

export default function Team() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="team-page" id="team-page">
      <nav className="team-nav">
        <div className="team-nav-logo">
        </div>

        <div className="team-nav-links">
          <Link to="/equipe" className="team-nav-link active">Equipe</Link>
          <Link to="/cadastro" className="team-nav-link">Cadastro</Link>
        </div>

        <div className="team-nav-right">
          {user?.picture && (
            <img src={user.picture} alt={user.name} className="team-nav-avatar" referrerPolicy="no-referrer" />
          )}
          <span className="team-nav-name">{user?.name?.split(' ')[0]}</span>
          <button className="team-nav-logout" onClick={handleLogout} id="logout-btn">Sair</button>
        </div>
      </nav>

      <div className="team-content">
        <div className="team-header">
          <h1 className="team-title">
            <span className="text-gradient">Nossa</span> Equipe
          </h1>
          <p className="team-subtitle">Os desenvolvedores por trás deste projeto</p>
        </div>

        <div className="team-cards">
          <article className="team-card" id="team-card-ana">
            <div className="team-photo">
              {members[0].photo ? (
                <img src={members[0].photo} alt={members[0].name} />
              ) : (
                <>
                  <span className="team-photo-initials">{members[0].initials}</span>
                  <span className="team-photo-label">Foto em breve</span>
                </>
              )}
            </div>
            <div className="team-info">
              <h2 className="team-name">{members[0].name}</h2>
              <p className="team-role">{members[0].role}</p>
              <p className="team-bio">{members[0].bio}</p>
              <div className="team-skills">
                {members[0].skills.map(s => <span className="team-skill" key={s}>{s}</span>)}
              </div>
            </div>
          </article>

          <div className="team-connector">
            <div className="team-connector-dot" />
            <div className="team-connector-line" />
          </div>

          <article className="team-card" id="team-card-joao">
            <div className="team-photo">
              {members[1].photo ? (
                <img src={members[1].photo} alt={members[1].name} />
              ) : (
                <>
                  <span className="team-photo-initials">{members[1].initials}</span>
                  <span className="team-photo-label">Foto em breve</span>
                </>
              )}
            </div>
            <div className="team-info">
              <h2 className="team-name">{members[1].name}</h2>
              <p className="team-role">{members[1].role}</p>
              <p className="team-bio">{members[1].bio}</p>
              <div className="team-skills">
                {members[1].skills.map(s => <span className="team-skill" key={s}>{s}</span>)}
              </div>
            </div>
          </article>
        </div>

        <div className="team-cta">
          <Link to="/cadastro" className="btn btn-primary team-cta-btn" id="go-to-register">
            Ir para o cadastro <span className="team-cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
