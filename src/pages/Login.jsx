import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAppState } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { clinicInfo } from '../data/mockData'

const emptyLogin = { identifier: '', password: '', remember: true }
const emptyRegister = { fullName: '', mobile: '', email: '', password: '', confirm: '' }

export default function Login() {
  const { isAuthenticated, login, register } = useAuth()
  const { bookingDraft } = useAppState()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [loginForm, setLoginForm] = useState(emptyLogin)
  const [registerForm, setRegisterForm] = useState(emptyRegister)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const validateLogin = () => {
    const next = {}
    if (!loginForm.identifier.trim()) next.identifier = 'Enter your mobile number or email.'
    if (!loginForm.password) next.password = 'Enter your password.'
    else if (loginForm.password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateRegister = () => {
    const next = {}
    if (!registerForm.fullName.trim()) next.fullName = 'Enter your full name.'
    if (!/^[0-9]{10}$/.test(registerForm.mobile.replace(/\s/g, ''))) next.mobile = 'Enter a valid 10-digit mobile number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) next.email = 'Enter a valid email address.'
    if (registerForm.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (registerForm.confirm !== registerForm.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onLogin = async (e) => {
    e.preventDefault()
    if (!validateLogin()) return
    setStatus('loading')
    setMessage('')
    try {
      await login(loginForm)
      setStatus('success')
      setMessage('Login successful. Taking you to your dashboard.')
      setTimeout(() => navigate(bookingDraft ? '/book-appointment' : '/dashboard'), 700)
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  const onRegister = async (e) => {
    e.preventDefault()
    if (!validateRegister()) return
    setStatus('loading')
    setMessage('')
    try {
      await register(registerForm)
      setStatus('success')
      setMessage('Account created. Welcome to CarePath.')
      setTimeout(() => navigate(bookingDraft ? '/book-appointment' : '/dashboard'), 700)
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-brand-800 text-white lg:flex lg:flex-col lg:justify-between p-10 xl:p-14">
        <Logo light />
        <div className="relative z-10 max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Patient care</p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight xl:text-5xl">{clinicInfo.tagline}</h1>
          <p className="mt-5 text-brand-100 leading-7">
            Book visits, track your token, and manage your healthcare journey from one calm, trusted place.
          </p>
        </div>
        <MedicalVisual />
        <p className="relative z-10 text-sm text-brand-200">Secure login · Protected patient information</p>
      </aside>

      <section className="flex items-center justify-center bg-slate-50 px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <Logo className="mb-5 hidden lg:flex" />
            {mode === 'login' ? (
              <>
                <h2 className="font-display text-2xl font-bold text-slate-900">Welcome Back</h2>
                <p className="mt-1 text-sm text-slate-500">Login to manage your appointments and healthcare journey.</p>
                <form className="mt-6 space-y-4" onSubmit={onLogin} noValidate>
                  <Input
                    id="identifier"
                    label="Mobile Number / Email"
                    placeholder="vishal@carepath.com"
                    value={loginForm.identifier}
                    error={errors.identifier}
                    onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                  />
                  <Input
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={loginForm.password}
                    error={errors.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    rightSlot={
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input
                        type="checkbox"
                        checked={loginForm.remember}
                        onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-300 text-brand-700"
                      />
                      Remember Me
                    </label>
                    <button type="button" className="font-medium text-brand-700 hover:text-brand-800">
                      Forgot Password
                    </button>
                  </div>
                  <Feedback status={status} message={message} />
                  <Button type="submit" className="w-full" loading={status === 'loading'}>
                    Login
                  </Button>
                </form>
                <p className="mt-5 text-center text-sm text-slate-600">
                  Don't have an account?{' '}
                  <button type="button" className="font-semibold text-brand-700" onClick={() => { setMode('register'); setStatus('idle'); setMessage(''); setErrors({}) }}>
                    Create Account
                  </button>
                </p>
                <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  Demo access: vishal@carepath.com / carepath123
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-slate-900">Create Account</h2>
                <p className="mt-1 text-sm text-slate-500">Set up your patient profile to start booking care.</p>
                <form className="mt-6 space-y-4" onSubmit={onRegister} noValidate>
                  <Input id="fullName" label="Full Name" value={registerForm.fullName} error={errors.fullName} onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })} />
                  <Input id="mobile" label="Mobile Number" value={registerForm.mobile} error={errors.mobile} onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })} />
                  <Input id="email" label="Email" type="email" value={registerForm.email} error={errors.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
                  <Input id="reg-password" label="Password" type={showPassword ? 'text' : 'password'} value={registerForm.password} error={errors.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
                  <Input id="confirm" label="Confirm Password" type={showPassword ? 'text' : 'password'} value={registerForm.confirm} error={errors.confirm} onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })} />
                  <Feedback status={status} message={message} />
                  <Button type="submit" className="w-full" loading={status === 'loading'}>
                    Create Account
                  </Button>
                </form>
                <p className="mt-5 text-center text-sm text-slate-600">
                  Already have an account?{' '}
                  <button type="button" className="font-semibold text-brand-700" onClick={() => { setMode('login'); setStatus('idle'); setMessage(''); setErrors({}) }}>
                    Login
                  </button>
                </p>
              </>
            )}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1"><Lock size={12} /> Secure Login</span>
              <span className="inline-flex items-center gap-1"><ShieldCheck size={12} /> Protected Patient Information</span>
            </div>
          </div>
          <p className="mt-6 text-center text-sm">
            <Link to="/" className="text-slate-500 hover:text-brand-700">Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

function Feedback({ status, message }) {
  if (!message) return null
  const cls = status === 'error' ? 'bg-rose-50 text-rose-700' : status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-600'
  return <p className={`rounded-xl px-3 py-2 text-sm ${cls}`}>{message}</p>
}

function MedicalVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
      <svg viewBox="0 0 600 800" className="h-full w-full">
        <circle cx="480" cy="140" r="120" fill="#14b8a6" />
        <circle cx="80" cy="620" r="160" fill="#0f766e" />
        <rect x="180" y="260" width="240" height="280" rx="28" fill="#99f6e4" />
        <rect x="250" y="300" width="28" height="120" rx="8" fill="#0f766e" />
        <rect x="204" y="346" width="120" height="28" rx="8" fill="#0f766e" />
      </svg>
    </div>
  )
}
