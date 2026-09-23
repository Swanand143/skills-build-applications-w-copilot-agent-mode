import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { ResourcePage, ResourceState } from './ResourceState.jsx'

// Codespaces API endpoint: -8000.app.github.dev/api/teams/
function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('teams', controller.signal).then((items) => {
      setTeams(items)
      setState({ loading: false, error: '' })
    }).catch((error) => {
      if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="Your community" title="Teams" description="A little accountability goes a long way." count={teams.length}>
    <ResourceState {...state} />
    {!state.loading && !state.error && <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><div className="team-card-top"><span className="team-badge">♧</span><span className="member-count">{team.members?.length || 0} members</span></div><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'A team that keeps each other moving.'}</p><div className="team-footer"><span>{team.members?.slice(0, 3).map((member) => <span className="mini-avatar" key={member._id || member}>{(member.displayName || member.username || '?').charAt(0).toUpperCase()}</span>)}</span><span className="arrow">↗</span></div></article>)}</div>}
  </ResourcePage>
}

export default Teams