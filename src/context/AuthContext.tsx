'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

interface User {
  name: string
  email: string
  initials: string
  provider: 'email' | 'google'
  avatar?: string
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

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].charAt(0).toUpperCase()
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

function firebaseUserToUser(fbUser: FirebaseUser): User {
  const name = fbUser.displayName || fbUser.email?.split('@')[0] || 'User'
  const provider = fbUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email'
  return {
    uid: fbUser.uid,
    name,
    email: fbUser.email ?? '',
    initials: getInitials(name),
    provider,
    avatar: fbUser.photoURL ?? undefined,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Listen to Firebase auth state — fires on login, logout, and page refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser ? firebaseUserToUser(fbUser) : null)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password)
    // onAuthStateChanged will update user state automatically
  }

  async function loginWithGoogle(): Promise<void> {
    await signInWithPopup(auth, googleProvider)
    // onAuthStateChanged will update user state automatically
  }

  async function signup(name: string, email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    // Set display name immediately after account creation
    await updateProfile(credential.user, { displayName: name })
    // Manually update local state since onAuthStateChanged may fire before displayName is set
    setUser(firebaseUserToUser({ ...credential.user, displayName: name }))
  }

  async function logout(): Promise<void> {
    await signOut(auth)
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
