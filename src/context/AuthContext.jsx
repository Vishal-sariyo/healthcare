import { createContext, useContext, useMemo, useState } from 'react'
import { patient } from '../data/mockData'

const AuthContext = createContext(null)

const DEMO_EMAIL = 'vishal@carepath.com'
const DEMO_MOBILE = '9876543210'
const DEMO_PASSWORD = 'carepath123'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('carepath_user')
    return stored ? JSON.parse(stored) : null
  })

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: async ({ identifier, password, remember }) => {
        await wait(900)
        const id = identifier.trim().toLowerCase()
        const validId = id === DEMO_EMAIL || id.replace(/\s+/g, '') === DEMO_MOBILE
        if (!validId || password !== DEMO_PASSWORD) {
          throw new Error('Invalid mobile number, email, or password.')
        }
        const nextUser = { ...patient }
        if (remember) localStorage.setItem('carepath_user', JSON.stringify(nextUser))
        else localStorage.removeItem('carepath_user')
        setUser(nextUser)
        return nextUser
      },
      register: async (payload) => {
        await wait(1000)
        const nextUser = {
          ...patient,
          name: payload.fullName,
          firstName: payload.fullName.split(' ')[0],
          phone: payload.mobile,
          email: payload.email,
        }
        localStorage.setItem('carepath_user', JSON.stringify(nextUser))
        setUser(nextUser)
        return nextUser
      },
      logout: () => {
        localStorage.removeItem('carepath_user')
        setUser(null)
      },
      updateProfile: (updates) => {
        setUser((prev) => {
          const next = { ...prev, ...updates }
          localStorage.setItem('carepath_user', JSON.stringify(next))
          return next
        })
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
