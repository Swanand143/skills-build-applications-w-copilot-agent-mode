import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { ResourcePage, ResourceState } from './ResourceState.jsx'

// Codespaces API endpoint: -8000.app.github.dev/api/leaderboard/
function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('leaderboard', controller.signal).then((items) => {
      setEntries([...items].sort((a, b) => (b.points || 0) - (a.points || 0)))
      setState({ loading: false, error: '' })
    }).catch((error) => {
      if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="Friendly competition" title="Leaderboard" description="Celebrate the people moving the most." count={entries.length}>
    <ResourceState {...state} />
    {!state.loading && !state.error && <div className="data-list ranking-list">{entries.map((entry, index) => <article className={`data-row rank-row ${index === 0 ? 'top-rank' : ''}`} key={entry._id || entry.id || entry.userId?._id || index}><span className="rank-number">{String(index + 1).padStart(2, '0')}</span><div className="avatar">{(entry.userId?.displayName || entry.userId?.username || '?').charAt(0).toUpperCase()}</div><div className="row-main"><strong>{entry.userId?.displayName || entry.userId?.username || 'OctoFit member'}</strong><span>{entry.period || 'all-time'}</span></div><div className="points"><strong>{entry.points || 0}</strong><span>points</span></div></article>)}</div>}
  </ResourcePage>
}

export default Leaderboard