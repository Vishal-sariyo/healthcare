import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Button from './ui/Button'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/#services', label: 'Services', hash: 'services' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/#about', label: 'About', hash: 'about' },
  { to: '/#contact', label: 'Contact Us', hash: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  const isActive = (link) => {
    if (link.to === '/doctors') return location.pathname === '/doctors'
    if (link.to === '/') return location.pathname === '/' && !location.hash
    return location.hash === `#${link.hash}`
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0" aria-label="CarePath home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(link) ? 'text-brand-800 bg-brand-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="secondary" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
          )}
          <Link to={isAuthenticated ? '/book-appointment' : '/login'}>
            <Button size="sm">Book Appointment</Button>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link to={isAuthenticated ? '/dashboard' : '/login'} onClick={() => setOpen(false)}>
              <Button variant="secondary" className="w-full">
                {isAuthenticated ? 'Dashboard' : 'Login'}
              </Button>
            </Link>
            <Link to={isAuthenticated ? '/book-appointment' : '/login'} onClick={() => setOpen(false)}>
              <Button className="w-full">Book Appointment</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
