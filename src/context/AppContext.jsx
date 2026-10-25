import { createContext, useContext, useMemo, useState } from 'react'
import { initialAppointments, initialNotifications } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [bookingDraft, setBookingDraft] = useState(null)

  const upcoming = appointments.find((a) => a.status === 'Confirmed') || appointments[0]

  const value = useMemo(
    () => ({
      appointments,
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      upcoming,
      bookingDraft,
      setBookingDraft,
      addAppointment: (appointment) => {
        setAppointments((prev) => [appointment, ...prev])
      },
      updateAppointment: (id, updates) => {
        setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
      },
      markNotificationRead: (id) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      },
      markAllNotificationsRead: () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      },
    }),
    [appointments, notifications, upcoming, bookingDraft],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppState must be used within AppProvider')
  return ctx
}
