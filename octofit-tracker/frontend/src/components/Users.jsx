import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { ResourcePage, ResourceState } from './ResourceState.jsx'

// Codespaces API endpoint: -8000.app.github.dev/api/users/
function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('users', controller.signal).then((items) => {
      setUsers(items)
      setState({ loading: false, error: '' })
    }).catch((error) => {
      if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="Your people" title="Users" description="Meet the members making movement a habit." count={users.length}>
    <ResourceState {...state} />
    {!state.loading && !state.error && <div className="data-list">{users.map((user) => <article className="data-row" key={user._id || user.id || user.username}><div className="avatar">{(user.displayName || user.username || '?').charAt(0).toUpperCase()}</div><div className="row-main"><strong>{user.displayName || user.username || 'OctoFit member'}</strong><span>@{user.username || 'member'}</span></div><span className="user-email">{user.email || 'Email not provided'}</span><span className="member-status">Active</span></article>)}</div>}
  </ResourcePage>
}

export default Users