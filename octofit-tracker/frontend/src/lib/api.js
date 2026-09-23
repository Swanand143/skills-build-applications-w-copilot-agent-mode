const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

// VITE_CODESPACE_NAME is defined in .env.local for a Codespaces deployment.
const apiOrigin = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(component) {
  return `${apiOrigin}/api/${component}/`
}

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

export async function fetchCollection(component, signal) {
  const response = await fetch(apiUrl(component), { signal })
  if (!response.ok) throw new Error(`Unable to load ${component}.`)
  return collectionFromResponse(await response.json())
}