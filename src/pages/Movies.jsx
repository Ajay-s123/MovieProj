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
          <div className="movies-hero-backdrop">
            <img
              src={HERO_MOVIE.poster || `https://picsum.photos/seed/hero/1920/800`}
              alt=""
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling?.style.display = 'block'
              }}
            />
            <div
              className="movies-hero-backdrop-fallback"
              style={{ display: 'none', backgroundImage: `url(https://picsum.photos/seed/hero2/1920/800)` }}
            />
          </div>
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
              {row.movies.map((movie) => {
                const fallbackPoster = `https://picsum.photos/seed/movie-${movie.id}/200/300`
                const posterUrl = movie.poster || fallbackPoster
                return (
                  <div key={movie.id} className="movies-poster-wrap">
                    <div className="movies-poster">
                      <img
                        src={posterUrl}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const img = e.target
                          if (img.dataset.fallbackUsed) {
                            img.style.display = 'none'
                            img.closest('.movies-poster')?.classList.add('poster-error')
                            return
                          }
                          img.dataset.fallbackUsed = '1'
                          img.src = fallbackPoster
                          img.onerror = null
                        }}
                      />
                      <span className="movies-poster-title">{movie.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
