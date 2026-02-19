import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { addUser, findUserByEmail, generateSalt, hashPassword } from '../lib/authStorage'
import './auth.css'

const SIGNUP_MESSAGES = [
  {
    title: 'Welcome to MovieBox',
    subtitle: 'Create your account',
  },
  {
    title: 'Start your journey',
    subtitle: 'Explore endless movies',
  },
  {
    title: 'Personalize your experience',
    subtitle: 'Save favorites & watchlists',
  },
  {
    title: 'Connect with others',
    subtitle: 'Share reviews & ratings',
  },
  {
    title: 'Join the community',
    subtitle: 'Millions already watching',
  },
]

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [currentSlide, setCurrentSlide] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SIGNUP_MESSAGES.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const welcomeText = SIGNUP_MESSAGES[currentSlide]

  async function onSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!username.trim()) next.username = 'User name is required'
    if (!email.trim()) next.email = 'Email is required'
    if (!phone.trim()) next.phone = 'Phone is required'
    if (!password) next.password = 'Password is required'
    if (!confirmPassword) next.confirmPassword = 'Confirm password is required'
    if (password && confirmPassword && password !== confirmPassword) {
      next.confirmPassword = 'Passwords do not match'
    }
    const existing = findUserByEmail(email)
    if (email.trim() && existing) next.email = 'This email is already registered'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      const salt = generateSalt()
      const passwordHash = await hashPassword(password, salt)
      addUser({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        passwordHash,
        salt,
      })
      navigate('/login', { state: { fromSignup: true } })
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
                  {SIGNUP_MESSAGES.map((_, index) => (
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
            <div className="auth-title">Create your account!</div>

            <form className="auth-form" onSubmit={onSubmit}>
              <label className="auth-field">
                <span aria-hidden="true">👤</span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User name"
                  autoComplete="username"
                />
              </label>
              {errors.username ? <div className="auth-error">{errors.username}</div> : null}

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

              <label className="auth-field">
                <span aria-hidden="true">📱</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </label>
              {errors.phone ? <div className="auth-error">{errors.phone}</div> : null}

              <label className="auth-field">
                <span aria-hidden="true">🔒</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </label>
              {errors.password ? <div className="auth-error">{errors.password}</div> : null}

              <label className="auth-field">
                <span aria-hidden="true">🔒</span>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  type="password"
                  autoComplete="new-password"
                />
              </label>
              {errors.confirmPassword ? (
                <div className="auth-error">{errors.confirmPassword}</div>
              ) : null}
              {errors.form ? <div className="auth-error">{errors.form}</div> : null}

              <button className="auth-submit" type="submit" disabled={submitting}>
                {submitting ? 'Creating account…' : 'Continue'}
              </button>
            </form>

            <div className="auth-divider">Sign up With</div>

            <div className="auth-social">
              <button type="button" className="social-btn" aria-label="Sign up with Facebook">
                <span style={{ color: '#1877F2', fontWeight: 800 }}>f</span>
              </button>
              <button type="button" className="social-btn" aria-label="Sign up with Google">
                <span style={{ color: '#EA4335', fontWeight: 800 }}>G</span>
              </button>
              <button type="button" className="social-btn" aria-label="Sign up with Apple">
                <span style={{ color: '#111827', fontWeight: 800 }}></span>
              </button>
            </div>

            <div className="auth-bottom">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

