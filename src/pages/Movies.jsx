import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import tmdb from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'
import GenreFilter from '../components/GenreFilter'
import Loading from '../components/Loading'

function Movies() {
  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('q') || '').trim()

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // جلب قائمة التصنيفات مرة واحدة
  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await tmdb.get('/genre/movie/list')
        setGenres(res.data.genres || [])
      } catch (err) {
        console.error('Failed to fetch genres:', err)
      }
    }

    fetchGenres()
  }, [])

  // الرجوع للصفحة الأولى عند تغيير البحث أو التصنيف
  useEffect(() => {
    setPage(1)
  }, [searchQuery, selectedGenre])

  function handleSelectGenre(genreId) {
    setSelectedGenre(genreId)
    setPage(1)
  }

  // جلب الأفلام حسب البحث أو التصنيف أو الشائع مع رقم الصفحة
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true)
        setError(null)

        let response
        if (searchQuery) {
          response = await tmdb.get('/search/movie', {
            params: { query: searchQuery, page },
          })
        } else if (selectedGenre) {
          response = await tmdb.get('/discover/movie', {
            params: { with_genres: selectedGenre, page },
          })
        } else {
          response = await tmdb.get('/movie/popular', {
            params: { page },
          })
        }

        setMovies(response.data.results || [])
        setTotalPages(Math.min(response.data.total_pages || 1, 500))
      } catch (err) {
        setError('Failed to fetch movies.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [searchQuery, selectedGenre, page])

  const activeGenreName = genres.find((g) => g.id === selectedGenre)?.name

  return (
    <main className="movies-page">
      <section className="movies-section">
        <div className="section-header">
          <div>
            <h2>
              {searchQuery
                ? 'Search Results'
                : activeGenreName
                  ? `${activeGenreName} Movies`
                  : 'All Movies'}
            </h2>
            <p>
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : activeGenreName
                  ? `Filtered by ${activeGenreName}`
                  : 'Explore popular movies'}
            </p>
          </div>
        </div>

        {!searchQuery && (
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={handleSelectGenre}
          />
        )}

        {loading && (
          <Loading
            message={
              searchQuery ? `Searching for "${searchQuery}"...` : 'Loading movies...'
            }
          />
        )}

        {error && <p className="status-message error-message">{error}</p>}

        {!loading && !error && movies.length === 0 && (
          <p className="status-message">No movies found for this selection.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <MovieGrid movies={movies} />

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => Math.max(prev - 1, 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  ← Previous
                </button>

                <span className="pagination-info">
                  Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => Math.min(prev + 1, totalPages))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  disabled={page === totalPages}
                  className="pagination-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Movies