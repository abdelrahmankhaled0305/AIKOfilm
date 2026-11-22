const STORAGE_KEY = 'movie_explorer_favorites'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Failed to read favorites from localStorage:', err)
    return []
  }
}

export function isFavorite(movieId) {
  const favorites = getFavorites()
  return favorites.some((movie) => movie.id === movieId)
}

export function toggleFavorite(movie) {
  const favorites = getFavorites()
  const exists = favorites.some((item) => item.id === movie.id)

  const updated = exists
    ? favorites.filter((item) => item.id !== movie.id)
    : [movie, ...favorites]

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save favorites to localStorage:', err)
  }

  return updated
}

export function clearFavorites() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Failed to clear favorites:', err)
  }
  return []
}