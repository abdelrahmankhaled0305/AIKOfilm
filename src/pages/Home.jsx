import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import tmdb from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'
import Loading from '../components/Loading'

const IMG_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original'

function Home() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHomeMovies() {
      try {
        setLoading(true)
        setError(null)

        const [popularRes, topRatedRes] = await Promise.all([
          tmdb.get('/movie/popular'),
          tmdb.get('/movie/top_rated'),
        ])

        const popularList = popularRes.data.results || []
        const topRatedList = topRatedRes.data.results || []

        setPopularMovies(popularList.slice(0, 5))
        setTopRatedMovies(topRatedList.slice(0, 5))

        const heroCandidate =
          popularList.find((movie) => movie.backdrop_path) || popularList[0] || null
        setFeaturedMovie(heroCandidate)
      } catch (err) {
        setError('Failed to fetch movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeMovies()
  }, [])

  
if (loading) {
  return (
    <main className="home-page">
      <Loading message="Loading movies..." />
    </main>
  )
}

  if (error) {
    return (
      <main className="home-page">
        <p className="status-message error-message">{error}</p>
      </main>
    )
  }

  return (
    <main className="home-page">
      {/* 1. Hero Section */}
      {featuredMovie && (
        <section
          className="hero-section"
          style={
            featuredMovie.backdrop_path
              ? {
                  backgroundImage: `linear-gradient(to top, #0b0d13 10%, rgba(11, 13, 19, 0.65) 60%, rgba(11, 13, 19, 0.35) 100%), url(${IMG_BACKDROP_BASE}${featuredMovie.backdrop_path})`,
                }
              : undefined
          }
        >
          <div className="hero-content">
            <span className="hero-badge">Featured Today</span>
            <h1 className="hero-title">{featuredMovie.title}</h1>
            <p className="hero-overview">{featuredMovie.overview}</p>

            <div className="hero-meta">
              <span>★ {featuredMovie.vote_average?.toFixed(1)}</span>
              {featuredMovie.release_date && (
                <span>{featuredMovie.release_date.slice(0, 4)}</span>
              )}
            </div>

            <div className="hero-actions">
              <Link to={`/movies/${featuredMovie.id}`} className="btn-primary">
                View Details
              </Link>
              <Link to="/movies" className="btn-secondary">
                Browse All Movies
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. Popular Movies Preview */}
      <section className="movies-section">
        <div className="section-header">
          <div>
            <h2>Popular Movies</h2>
            <p>Discover movies you might love</p>
          </div>
          <Link to="/movies" className="see-all-link">
            See All →
          </Link>
        </div>

        <MovieGrid movies={popularMovies} />
      </section>

      {/* 3. Top Rated Preview */}
      <section className="movies-section">
        <div className="section-header">
          <div>
            <h2>Top Rated</h2>
            <p>Highest-rated picks across genres</p>
          </div>
          <Link to="/movies" className="see-all-link">
            Explore More →
          </Link>
        </div>

        <MovieGrid movies={topRatedMovies} />
      </section>
    </main>
  )
}

export default Home