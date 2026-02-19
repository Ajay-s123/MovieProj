import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../lib/authStorage'
import { ROWS, HERO_MOVIE } from '../data/mockMovies'
import './Movies.css'

export default function Movies() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="movies-page">
      <header className="movies-header">
        <div className="movies-header-inner">
          <Link to="/" className="movies-logo">
            <span className="logo-icon">🎬</span>
            <span>MovieBox</span>
          </Link>
          <nav className="movies-nav">
            <a href="#home">Home</a>
            <a href="#movies">Movies</a>
            <a href="#new">New & Popular</a>
            <a href="#list">My List</a>
          </nav>
          <div className="movies-header-right">
            <span className="movies-user-name">{user?.username || 'User'}</span>
            <button type="button" className="movies-icon-btn" aria-label="Search">
              🔍
            </button>
            <button type="button" className="movies-icon-btn" aria-label="Notifications">
              🔔
            </button>
            <button
              type="button"
              className="movies-avatar"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      <main className="movies-main">
        {/* Hero banner - uses wide backdrop image like Netflix */}
        <section className="movies-hero">
          <div
            className="movies-hero-backdrop"
            style={{ backgroundImage: HERO_MOVIE.poster ? `url(${HERO_MOVIE.poster})` : undefined }}
          />
          <div className="movies-hero-shade" />
          <div className="movies-hero-content">
            <h1 className="movies-hero-title">{HERO_MOVIE.title}</h1>
            <p className="movies-hero-desc">
              Explore thousands of movies. Watch anywhere. Cancel anytime.
            </p>
            <div className="movies-hero-actions">
              <button type="button" className="movies-btn movies-btn-play">
                ▶ Play
              </button>
              <button type="button" className="movies-btn movies-btn-info">
                ℹ More Info
              </button>
            </div>
          </div>
        </section>

        {/* Horizontal rows */}
        {ROWS.map((row) => (
          <section key={row.title} className="movies-row">
            <h2 className="movies-row-title">{row.title}</h2>
            <div className="movies-row-slider">
              {row.movies.map((movie) => (
                <div key={movie.id} className="movies-poster-wrap">
                  <div className="movies-poster" data-poster={movie.poster || ''}>
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          const wrap = e.target.closest('.movies-poster')
                          if (wrap) wrap.classList.add('poster-error')
                        }}
                      />
                    ) : null}
                    <span className="movies-poster-title">{movie.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
