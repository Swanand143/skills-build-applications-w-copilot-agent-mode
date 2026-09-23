import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { ResourcePage, ResourceState } from './ResourceState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('activities', controller.signal).then((items) => {
      setActivities(items)
      setState({ loading: false, error: '' })
    }).catch((error) => {
      if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="Movement log" title="Activities" description="Every session, one place." count={activities.length}>
    <ResourceState {...state} />
    {!state.loading && !state.error && <div className="data-list">{activities.map((activity) => <article className="data-row" key={activity._id || activity.id || `${activity.type}-${activity.recordedAt}`}><div className="row-icon activity-icon">↗</div><div className="row-main"><strong>{activity.type || 'Activity'}</strong><span>{activity.userId?.displayName || activity.userId?.username || 'OctoFit member'}</span></div><div className="row-value"><strong>{activity.durationMinutes || 0} min</strong><span>{activity.calories || 0} calories</span></div><time>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : 'No date'}</time></article>)}</div>}
  </ResourcePage>
}

export default Activities