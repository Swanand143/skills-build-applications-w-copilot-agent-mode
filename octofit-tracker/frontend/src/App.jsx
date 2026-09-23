import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit <strong>Tracker</strong></span>
        </NavLink>
        <div className="status-chip"><span /> Live workspace</div>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <p className="eyebrow">Workspace</p>
          <nav aria-label="Primary navigation">
            <NavItem to="/" label="Overview" icon="⌂" end />
            <NavItem to="/activities" label="Activities" icon="↗" />
            <NavItem to="/leaderboard" label="Leaderboard" icon="★" />
            <NavItem to="/teams" label="Teams" icon="♧" />
            <NavItem to="/users" label="Users" icon="◎" />
            <NavItem to="/workouts" label="Workouts" icon="▣" />
          </nav>
          <div className="sidebar-note">
            <span className="note-mark">+</span>
            <div>
              <strong>Keep moving</strong>
              <small>Small sessions add up.</small>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function NavItem({ end, icon, label, to }) {
  return (
    <NavLink className="nav-item" end={end} to={to}>
      <span className="nav-icon" aria-hidden="true">{icon}</span>
      {label}
    </NavLink>
  )
}

function Overview() {
  return (
    <section className="overview-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Wednesday, September 23</p>
          <h1>Make today count.</h1>
          <p className="lede">Your team is building momentum. Keep the streak alive.</p>
        </div>
        <NavLink className="primary-action" to="/activities">Log an activity <span>+</span></NavLink>
      </div>

      <div className="overview-grid">
        <div className="feature-panel">
          <div className="feature-copy">
            <p className="eyebrow">This week</p>
            <h2>Consistency beats intensity.</h2>
            <p>Three focused sessions this week puts you ahead of your last one.</p>
            <NavLink className="text-link" to="/workouts">Find a workout <span>→</span></NavLink>
          </div>
          <div className="ring-stat" aria-label="Weekly progress 68 percent">
            <strong>68</strong><span>%</span>
            <small>weekly goal</small>
          </div>
        </div>
        <div className="metric-panel accent-panel"><span className="metric-label">Team rank</span><strong>#2</strong><small>of 8 teams</small><NavLink to="/leaderboard">View leaderboard →</NavLink></div>
        <div className="metric-panel"><span className="metric-label">Active members</span><strong>24</strong><small>+4 this month</small><NavLink to="/users">View members →</NavLink></div>
      </div>

      <div className="section-heading"><div><p className="eyebrow">Quick access</p><h2>Your tracker</h2></div><span className="muted">Synced just now</span></div>
      <div className="quick-grid">
        <QuickLink to="/activities" title="Activities" detail="Log and review movement" icon="↗" />
        <QuickLink to="/teams" title="Teams" detail="See who is moving with you" icon="♧" />
        <QuickLink to="/workouts" title="Workouts" detail="Choose your next session" icon="▣" />
      </div>
    </section>
  )
}

function QuickLink({ detail, icon, title, to }) {
  return <NavLink className="quick-link" to={to}><span className="quick-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span><span className="arrow">↗</span></NavLink>
}

export default App
