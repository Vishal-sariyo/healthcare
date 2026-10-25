import { Clock, MapPin, Video } from 'lucide-react'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'

export default function AppointmentCard({ appointment, actions }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-slate-900">{appointment.doctorName}</h3>
          <p className="text-sm text-slate-500">{appointment.specialization}</p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
        <p>{appointment.displayDate}</p>
        <p className="inline-flex items-center gap-1"><Clock size={14} /> {appointment.time}</p>
        <p className="inline-flex items-center gap-1">
          {appointment.type === 'Online' ? <Video size={14} /> : <MapPin size={14} />}
          {appointment.type}
        </p>
        <p>Token {appointment.token}</p>
      </div>
      {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
    </article>
  )
}

export function AppointmentActions({ onView, onTrack, onReschedule, onCancel, compact }) {
  return (
    <>
      {onView && (
        <Button size="sm" variant="secondary" onClick={onView}>
          {compact ? 'Details' : 'View Details'}
        </Button>
      )}
      {onTrack && (
        <Button size="sm" onClick={onTrack}>
          Track Queue
        </Button>
      )}
      {onReschedule && (
        <Button size="sm" variant="ghost" onClick={onReschedule}>
          Reschedule
        </Button>
      )}
      {onCancel && (
        <Button size="sm" variant="ghost" className="text-rose-600 hover:bg-rose-50" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </>
  )
}
