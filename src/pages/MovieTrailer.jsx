import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import tmdb from '../api/tmdb'
import Loading from '../components/Loading'

function MovieTrailer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const passedTitle = location.state?.title || ''

  const [movieTitle, setMovieTitle] = useState(passedTitle)
  const [trailerKey, setTrailerKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTrailer() {
      try {
        setLoading(true)
        setError(null)

        const requests = [tmdb.get(`/movie/${id}/videos`)]
        if (!passedTitle) {
          requests.push(tmdb.get(`/movie/${id}`))
        }

        const [videosRes, detailsRes] = await Promise.all(requests)

        if (detailsRes?.data?.title) {
          setMovieTitle(detailsRes.data.title)
        }

        const videos = videosRes.data?.results || []
        const selectedTrailer =
          videos.find(
            (vid) =>
              vid.site === 'YouTube' &&
              vid.type === 'Trailer' &&
              vid.official
          ) ||
          videos.find(
            (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
          ) ||
          videos.find((vid) => vid.site === 'YouTube')

        setTrailerKey(selectedTrailer ? selectedTrailer.key : null)
      } catch (err) {
        setError('Failed to load movie trailer.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTrailer()
    }
  }, [id, passedTitle])

  if (loading) {
    return (
      <main className="trailer-page">
        <Loading message="Loading trailer..." />
      </main>
    )
  }

  return (
    <main className="trailer-page">
      <div className="trailer-container">
        <div className="trailer-header">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="back-btn"
          >
            ← Back
          </button>

        </div>

        <h1 className="trailer-page-title">
          {movieTitle ? `${movieTitle} — Official Trailer` : 'Movie Trailer'}
        </h1>

        {error && <p className="status-message error-message">{error}</p>}

        {!error && trailerKey && (
          <div className="trailer-wrapper trailer-wrapper-lg">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movieTitle || 'Movie'} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {!error && !trailerKey && (
          <div className="empty-favorites">
            <p>No trailer available for this movie on YouTube.</p>
            <Link to={`/movies/${id}`} className="btn-primary">
              Back to Movie Details
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default MovieTrailer