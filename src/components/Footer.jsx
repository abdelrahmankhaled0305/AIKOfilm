import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Brief */}
        <div className="footer-brand">
          <Link to="/" className="logo">
            AIKO<span>film</span>
          </Link>
          <p>
            Discover popular movies, top-rated picks, and save your favorites.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        {/* Attribution */}
        <div className="footer-meta">
          <h4>Data Source</h4>
          <p>Movie data provided by TMDB.</p>
        </div>
      </div>

<div className="footer-bottom">
  <p>
    © {currentYear} AIKOfilm All rights To{' '}
    <a
      href="https://www.linkedin.com/in/engineer-abdelrahman-al-arabi/"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-credit-link"
    >
      Abdelrahman Khaled
    </a>
  </p>
</div>

    </footer>
  )
}

export default Footer