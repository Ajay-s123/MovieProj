import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { findUserByEmail, setCurrentUser, verifyPassword } from '../lib/authStorage'
import './auth.css'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-5.9S8.8 6.1 12 6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17 3.5 14.8 2.5 12 2.5 6.9 2.5 2.8 6.6 2.8 11.7S6.9 20.9 12 20.9c7 0 8.7-4.9 8.7-7.4 0-.5-.1-.9-.1-1.3H12z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23 10.1 24v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5h-2.9V24C19.6 23 24 18.1 24 12.1z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#111827"
        d="M16.6 2.3c-1 .1-2.2.7-2.9 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.2-.6 2.9-1.5.7-.9 1.2-2.1 1.1-3.3zM19.9 17.3c-.5 1.2-1.1 2.3-1.9 3.3-.8 1-1.6 2-2.9 2-1.2 0-1.6-.7-3.1-.7s-2 .7-3.1.7c-1.2 0-2-.9-2.8-1.9-1.6-2.1-2.9-6-1.2-8.6.8-1.3 2.3-2.2 3.9-2.2 1.2 0 2.3.8 3.1.8.7 0 2.1-1 3.6-.9.6 0 2.4.1 3.5 1.8-.1.1-2.1 1.2-2.1 3.6 0 2.8 2.5 3.7 2.6 3.7-.1.2-.2.5-.5 1.2z"
      />
    </svg>
  )
}

const WELCOME_MESSAGES = [
  {
    title: 'Welcome to the community',
    subtitle: 'Login to explore',
  },
  {
    title: 'Discover new movies',
    subtitle: 'Every day',
  },
  {
    title: 'Track your favorites',
    subtitle: 'Build your watchlist',
  },
  {
    title: 'Rate and review',
    subtitle: 'Share your thoughts',
  },
  {
    title: 'Join millions',
    subtitle: 'Start watching now',
  },
]

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromSignup = location.state?.fromSignup
  const [method, setMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [currentSlide, setCurrentSlide] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % WELCOME_MESSAGES.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const welcomeText = WELCOME_MESSAGES[currentSlide]

  async function onSubmit(e) {
    e.preventDefault()
    const next = {}
    if (method === 'email' && !email.trim()) next.email = 'Email is required'
    if (!password) next.password = 'Password is required'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      const user = findUserByEmail(email)
      if (!user) {
        setErrors({ form: 'Invalid email or password.' })
        setSubmitting(false)
        return
      }
      const ok = await verifyPassword(password, user.salt, user.passwordHash)
      if (!ok) {
        setErrors({ form: 'Invalid email or password.' })
        setSubmitting(false)
        return
      }
      setCurrentUser({ id: user.id, username: user.username, email: user.email })
      navigate('/movies')
    } catch (err) {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <section className="auth-left" aria-hidden="true">
            <div className="auth-left-inner">
              <div className="auth-orb" />
              <div className="auth-waves" />
              <div className="auth-welcome">
                <p>
                  {welcomeText.title}
                  <br />
                  {welcomeText.subtitle}
                </p>
                <div className="auth-dots">
                  {WELCOME_MESSAGES.map((_, index) => (
                    <span
                      key={index}
                      className={index === currentSlide ? 'active' : ''}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="auth-right">
            <div>
              <div className="auth-title">Login your account!</div>
              {fromSignup && (
                <p className="auth-success-msg">Account created. Please log in.</p>
              )}
              <div className="auth-tabs" role="tablist" aria-label="Login method">
                <button
                  type="button"
                  className={`auth-tab ${method === 'email' ? 'active' : ''}`}
                  onClick={() => setMethod('email')}
                  role="tab"
                  aria-selected={method === 'email'}
                >
                  E-mail
                </button>
                <button
                  type="button"
                  className={`auth-tab ${method === 'mobile' ? 'active' : ''}`}
                  onClick={() => setMethod('mobile')}
                  role="tab"
                  aria-selected={method === 'mobile'}
                >
                  Mobile Number
                </button>
              </div>
            </div>

            <form className="auth-form" onSubmit={onSubmit}>
              {method === 'email' ? (
                <>
                  <label className="auth-field">
                    <span aria-hidden="true">✉️</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                      autoComplete="email"
                    />
                  </label>
                  {errors.email ? <div className="auth-error">{errors.email}</div> : null}
                </>
              ) : (
                <div className="auth-error" style={{ marginTop: 0 }}>
                  Mobile login is not enabled yet. Please use email.
                </div>
              )}

              <label className="auth-field">
                <span aria-hidden="true">🔒</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </label>
              {errors.password ? <div className="auth-error">{errors.password}</div> : null}

              <div className="auth-row">
                <a className="auth-link" href="#forgot">
                  Forgot password?
                </a>
              </div>
              {errors.form ? <div className="auth-error">{errors.form}</div> : null}

              <button className="auth-submit" type="submit" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Continue'}
              </button>
            </form>

            <div className="auth-divider">Sign in With</div>

            <div className="auth-social">
              <button type="button" className="social-btn" aria-label="Sign in with Facebook">
                <FacebookIcon />
              </button>
              <button type="button" className="social-btn" aria-label="Sign in with Google">
                <GoogleIcon />
              </button>
              <button type="button" className="social-btn" aria-label="Sign in with Apple">
                <AppleIcon />
              </button>
            </div>

            <div className="auth-bottom">
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

