import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid'
import { getFavorites, clearFavorites } from '../utils/favorites'

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  function handleClearAll() {
    const cleared = clearFavorites()
    setFavorites(cleared)
  }

  function handleFavoriteChange(updatedList) {
    setFavorites(updatedList)
  }

  return (
    <main className="favorites-page">
      <section className="movies-section">
        <div className="section-header">
          <div>
            <h2>My Favorites</h2>
            <p>
              {favorites.length > 0
                ? `You have ${favorites.length} saved ${favorites.length === 1 ? 'movie' : 'movies'}`
                : 'Movies you save will appear here'}
            </p>
          </div>

          {favorites.length > 0 && (
            <button onClick={handleClearAll} className="clear-btn">
              Clear All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <p>Your favorites list is currently empty.</p>
            <Link to="/movies" className="btn-primary">
              Browse Movies
            </Link>
          </div>
        ) : (
          <MovieGrid
            movies={favorites}
            onFavoriteChange={handleFavoriteChange}
          />
        )}
      </section>
    </main>
  )
}

export default Favorites