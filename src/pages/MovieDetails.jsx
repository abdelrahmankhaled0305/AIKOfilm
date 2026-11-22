import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import tmdb from '../api/tmdb'
import { isFavorite, toggleFavorite } from '../utils/favorites'
import Loading from '../components/Loading'

const IMG_BACKDROP = 'https://image.tmdb.org/t/p/original'
const IMG_POSTER = 'https://image.tmdb.org/t/p/w500'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [hasTrailer, setHasTrailer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true)
        setError(null)
        setHasTrailer(false)

        const [detailsRes, videosRes] = await Promise.all([
          tmdb.get(`/movie/${id}`),
          tmdb.get(`/movie/${id}/videos`),
        ])

        setMovie(detailsRes.data)

        const videos = videosRes.data?.results || []
        const foundTrailer = videos.some((vid) => vid.site === 'YouTube')
        setHasTrailer(foundTrailer)
      } catch (err) {
        setError('Failed to load movie details.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMovieDetails()
    }
  }, [id])

  useEffect(() => {
    if (movie?.id) {
      setFavorite(isFavorite(movie.id))
    }
  }, [movie])

  function handleToggleFavorite() {
    if (!movie) return
    toggleFavorite(movie)
    setFavorite((prev) => !prev)
  }

  if (loading) {
    return (
      <main className="details-page">
        <Loading message="Loading movie details..." />
      </main>
    )
  }

  if (error || !movie) {
    return (
      <main className="details-page">
        <p className="status-message error-message">{error || 'Movie not found.'}</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Go Back
        </button>
      </main>
    )
  }

  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const runtime = movie.runtime ? `${movie.runtime} min` : null

  return (
    <main className="details-page">
      {movie.backdrop_path && (
        <div
          className="details-backdrop"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11, 13, 19, 0.75), #0b0d13 95%), url(${IMG_BACKDROP}${movie.backdrop_path})`,
          }}
        />
      )}

      <div className="details-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="details-grid">
          {/* Poster */}
          <div className="details-poster-wrapper">
            {movie.poster_path ? (
              <img
                src={`${IMG_POSTER}${movie.poster_path}`}
                alt={movie.title}
                className="details-poster"
              />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}
          </div>

          {/* Info */}
          <div className="details-info">
            <h1 className="details-title">{movie.title}</h1>
            {movie.tagline && <p className="details-tagline">"{movie.tagline}"</p>}

            <div className="details-meta">
              <span className="rating-badge">★ {rating}</span>
              <span>{releaseYear}</span>
              {runtime && <span>{runtime}</span>}
            </div>

            {movie.genres?.length > 0 && (
              <div className="details-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="details-actions">
              <button
                type="button"
                onClick={handleToggleFavorite}
                className="btn-secondary"
              >
                {favorite ? '♥ Saved in Favorites' : '♡ Add to Favorites'}
              </button>
            </div>

            <div className="details-overview-box">
              <h2>Overview</h2>
              <p>{movie.overview || 'No overview available for this movie.'}</p>
            </div>

            {/* Trailer CTA Button under Overview */}
            {hasTrailer && (
              <div className="details-trailer-cta">
                <Link
                  to={`/movies/${movie.id}/trailer`}
                  state={{ title: movie.title }}
                  className="trailer-btn"
                >
                  <span className="trailer-play-icon">▶</span>
                  <span>Watch Official Trailer</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MovieDetails