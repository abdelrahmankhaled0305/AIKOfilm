import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isFavorite, toggleFavorite } from '../utils/favorites'

const IMG_POSTER = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie, onFavoriteChange }) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    if (movie?.id) {
      setFavorite(isFavorite(movie.id))
    }
  }, [movie?.id])

  function handleFavoriteClick(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!movie) return
    const updatedList = toggleFavorite(movie)
    const nextState = !favorite
    setFavorite(nextState)

    // إبلاغ الصفحة الأم (مثلاً Favorites.jsx) لو حصل تغيير
    if (onFavoriteChange) {
      onFavoriteChange(updatedList, movie, nextState)
    }
  }

  if (!movie) return null

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'

  return (
    <article className="movie-card">
      <div className="movie-poster-wrapper">
        <Link to={`/movies/${movie.id}`} className="movie-card-link">
          {movie.poster_path ? (
            <img
              src={`${IMG_POSTER}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
              loading="lazy"
            />
          ) : (
            <div className="movie-no-poster">No Poster</div>
          )}
        </Link>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`card-fav-btn ${favorite ? 'is-favorite' : ''}`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          title={favorite ? 'Saved in Favorites' : 'Add to Favorites'}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>

      <Link to={`/movies/${movie.id}`} className="movie-card-body">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>
        <div className="movie-meta">
          <span className="movie-rating">★ {rating}</span>
          <span className="movie-year">{year}</span>
        </div>
      </Link>
    </article>
  )
}

export default MovieCard