export function ResourceState({ error, loading }) {
  if (loading) return <div className="resource-state">Loading records...</div>
  if (error) return <div className="resource-state error-state">{error}</div>
  return null
}

export function ResourcePage({ eyebrow, title, description, children, count }) {
  return (
    <section className="resource-page">
      <div className="page-heading compact-heading">
        <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div>
        {count !== undefined && <div className="count-badge"><strong>{count}</strong><span>records</span></div>}
      </div>
      {children}
    </section>
  )
}