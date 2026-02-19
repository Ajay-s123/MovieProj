/**
 * Auth storage: user signup/login with hashed passwords.
 * Passwords are hashed (one-way) so they cannot be decoded or seen by anyone.
 * At login we verify by hashing the entered password and comparing with the stored hash.
 */

const USERS_KEY = 'moviebox_users'
const CURRENT_USER_KEY = 'moviebox_currentUser'
const PBKDF2_ITERATIONS = 100000
const SALT_LENGTH = 16
const KEY_LENGTH = 32

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToBuffer(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}

/**
 * Generate a random salt (for new signups).
 */
export function generateSalt() {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
  return bufferToHex(salt)
}

/**
 * Hash a password with the given salt. Returns hex string.
 * One-way: the result cannot be "decoded" back to the password.
 */
export async function hashPassword(password, saltHex) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const salt = hexToBuffer(saltHex)
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    KEY_LENGTH * 8
  )
  return bufferToHex(bits)
}

/**
 * Verify login: hash the entered password with the user's stored salt and compare.
 */
export async function verifyPassword(password, saltHex, storedHashHex) {
  const hash = await hashPassword(password, saltHex)
  return hash === storedHashHex
}

/**
 * Get all stored users (for signup duplicate check and login lookup).
 */
export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Save a new user (signup). Expects user object with: username, email, phone, passwordHash, salt.
 */
export function addUser(user) {
  const users = getUsers()
  const id = crypto.randomUUID()
  users.push({ id, ...user })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return id
}

/**
 * Find user by email (case-insensitive).
 */
export function findUserByEmail(email) {
  const normalized = (email || '').trim().toLowerCase()
  return getUsers().find((u) => (u.email || '').toLowerCase() === normalized)
}

/**
 * Set the current logged-in user (after successful login).
 */
export function setCurrentUser(user) {
  const { id, username, email } = user
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id, username, email }))
}

/**
 * Get current logged-in user or null.
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Log out (clear current user).
 */
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY)
}
