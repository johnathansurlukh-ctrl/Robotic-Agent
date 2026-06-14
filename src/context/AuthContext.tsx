'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  name: string
  email: string
  initials: string
  provider: 'email'
  uid: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const SESSION_KEY = 'rk_session'
const USERS_KEY = 'rk_users'

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].charAt(0).toUpperCase()
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

function makeUid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

interface StoredUser {
  uid: string
  name: string
  email: string
  password: string
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toUser(s: StoredUser): User {
  return {
    uid: s.uid,
    name: s.name,
    email: s.email,
    initials: getInitials(s.name),
    provider: 'email',
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) {
        const stored: StoredUser = JSON.parse(raw)
        setUser(toUser(stored))
      }
    } catch {
      // ignore corrupted session
    }
    setLoading(false)
  }, [])

  async function login(email: string, password: string): Promise<void> {
    const users = getStoredUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) throw new Error('Invalid email or password.')
    localStorage.setItem(SESSION_KEY, JSON.stringify(found))
    setUser(toUser(found))
  }

  async function loginWithGoogle(): Promise<void> {
    throw new Error('Google sign-in is not available right now.')
  }

  async function signup(name: string, email: string, password: string): Promise<void> {
    const users = getStoredUsers()
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.')
    }
    const newUser: StoredUser = { uid: makeUid(), name: name.trim(), email, password }
    saveStoredUsers([...users, newUser])
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    setUser(toUser(newUser))
  }

  async function logout(): Promise<void> {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const value: AuthContextValue = {
    user,
    loading,
    login,
    loginWithGoogle,
    signup,
    logout,
    isAuthenticated: user !== null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
