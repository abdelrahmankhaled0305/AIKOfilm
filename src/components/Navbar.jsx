import { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate, useSearchParams } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(urlQuery)

  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed === urlQuery.trim()) return

    const timer = setTimeout(() => {
      if (trimmed) {
        navigate(`/movies?q=${encodeURIComponent(trimmed)}`)
      } else if (urlQuery) {
        navigate('/movies')
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query, urlQuery, navigate])

  function handleSubmit(currentValue) {
    const trimmed = currentValue.trim()
    if (trimmed) {
      navigate(`/movies?q=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/movies')
    }
  }

  function handleClear() {
    setQuery('')
    if (urlQuery) {
      navigate('/movies')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        AIKO<span>film</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={handleClear}
        onSubmit={handleSubmit}
        placeholder="Search movies..."
        className="navbar-search"
      />
    </nav>
  )
}

export default Navbar