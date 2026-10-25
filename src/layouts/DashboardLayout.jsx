import { Bell, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAppState } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout() {
  const { isAuthenticated, user } = useAuth()
  const { unreadCount } = useAppState()
  const [open, setOpen] = useState(false)

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="flex min-h-svh bg-slate-50">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-semibold text-slate-900 sm:text-lg">
              Good Morning, {user.firstName}
            </p>
            <p className="hidden text-sm text-slate-500 sm:block">Here's your healthcare overview.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/notifications"
              className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-600" />
              )}
            </Link>
            <Link to="/profile" className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-slate-50">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                {user.firstName[0]}
              </span>
              <span className="hidden text-sm font-medium text-slate-800 sm:block">{user.name}</span>
            </Link>
          </div>
        </header>
        <div className="flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </div>
        <nav className="sticky bottom-0 grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-2 lg:hidden" aria-label="Mobile">
          <BottomLink to="/dashboard" label="Home" />
          <BottomLink to="/appointments" label="Visits" />
          <BottomLink to="/queue" label="Queue" />
          <BottomLink to="/profile" label="Profile" />
        </nav>
      </div>
    </div>
  )
}

function BottomLink({ to, label }) {
  return (
    <Link to={to} className="rounded-lg py-2 text-center text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-800">
      {label}
    </Link>
  )
}
