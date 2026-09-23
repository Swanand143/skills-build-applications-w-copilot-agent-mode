import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { ResourcePage, ResourceState } from './ResourceState.jsx'

// Codespaces API endpoint: -8000.app.github.dev/api/workouts/
function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('workouts', controller.signal).then((items) => {
      setWorkouts(items)
      setState({ loading: false, error: '' })
    }).catch((error) => {
      if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="Personalized picks" title="Workouts" description="Meet your next good challenge." count={workouts.length}>
    <ResourceState {...state} />
    {!state.loading && !state.error && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.name}><div className={`difficulty ${workout.difficulty || 'steady'}`}>{workout.difficulty || 'steady'}</div><h2>{workout.name || 'Workout'}</h2><p>{workout.description || 'A focused session for today.'}</p><div className="workout-meta"><span>{workout.durationMinutes || 0} min</span><span>{workout.exercises?.length || 0} exercises</span></div><div className="exercise-list">{(workout.exercises || []).slice(0, 3).map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div>}
  </ResourcePage>
}

export default Workouts