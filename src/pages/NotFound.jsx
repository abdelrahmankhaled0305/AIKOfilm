import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-box">
        <span className="not-found-code">404</span>
        <h1>Page Not Found</h1>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/movies" className="btn-secondary">
            Browse Movies
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound