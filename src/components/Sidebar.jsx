import {
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Settings,
  Stethoscope,
  Ticket,
  UserRound,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { useAppState } from '../context/AppContext'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/book-appointment', label: 'Book Appointment', icon: CalendarDays },
  { to: '/appointments', label: 'My Appointments', icon: ClipboardList },
  { to: '/queue', label: 'Queue Status', icon: Ticket },
  { to: '/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/medical-records', label: 'Medical Records', icon: FileText },
  { to: '/prescriptions', label: 'Prescriptions', icon: FileText },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const { unreadCount } = useAppState()

  const nav = (
    <nav className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo />
        <button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={onClose} aria-label="Close sidebar">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto px-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <span className="flex items-center gap-3">
              <item.icon size={18} />
              {item.label}
            </span>
            {item.to === '/notifications' && unreadCount > 0 && (
              <span className="rounded-full bg-brand-700 px-1.5 py-0.5 text-[10px] font-bold text-white">{unreadCount}</span>
            )}
          </NavLink>
        ))}
      </div>
      <div className="p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">{nav}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-slate-900/40" aria-label="Close sidebar" onClick={onClose} />
          <aside className="relative h-full w-72 bg-white shadow-xl">{nav}</aside>
        </div>
      )}
    </>
  )
}
