import { BellOff } from 'lucide-react'
import NotificationCard from '../components/NotificationCard'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useAppState } from '../context/AppContext'

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppState()

  if (notifications.length === 0) {
    return <EmptyState icon={BellOff} title="No notifications" description="Appointment and queue updates will appear here." />
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-slate-900">Notifications</h1>
        <Button size="sm" variant="secondary" onClick={markAllNotificationsRead}>
          Mark all read
        </Button>
      </div>
      <div className="mt-5 space-y-3">
        {notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} onRead={markNotificationRead} />
        ))}
      </div>
    </div>
  )
}
