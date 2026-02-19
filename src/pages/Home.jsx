import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo" aria-label="MovieBox Home">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">MovieBox</span>
          </Link>
          <nav className="nav-links">
            <a href="#movies">Movies</a>
            <span className="nav-arrow">▾</span>
            <a href="#genres">Genres</a>
            <span className="nav-arrow">▾</span>
            <a href="#trending">Trending</a>
            <span className="nav-arrow">▾</span>
            <a href="#new">New Releases</a>
            <a href="#blog">Blog</a>
          </nav>
          <div className="header-actions">
            <Link to="/login" className="link-with-arrow">
              Log in <span className="arrow">→</span>
            </Link>
            <Link to="/signup" className="btn btn-outline" role="button">
              Sign up
            </Link>
            <button type="button" className="btn btn-primary">
              Explore movies
            </button>
            <button type="button" className="icon-btn" aria-label="Search">
              🔍
            </button>
            <button type="button" className="icon-btn" aria-label="Language">
              🌐
            </button>
          </div>
        </div>
      </header>

      <main className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">
            The ultimate movie platform{' '}
            <span className="hero-title-gradient">for film lovers</span>
          </h1>
          <p className="hero-subtitle">
            Discover, explore, and enjoy the latest films—all in one place.
          </p>
          <div className="hero-badges">
            <span>Action</span>
            <span>Drama</span>
            <span>Comedy</span>
            <span>Sci-Fi</span>
            <span>Thriller</span>
          </div>
          <div className="hero-ctas">
            <button type="button" className="btn btn-primary btn-lg">
              Explore movies
            </button>
            <Link to="/signup" className="btn btn-outline btn-lg" role="button">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
