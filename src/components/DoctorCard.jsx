import { CalendarDays, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'

function initials(name) {
  return name
    .replace('Dr. ', '')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
}

const avatarColors = ['bg-brand-700', 'bg-sky-700', 'bg-indigo-700', 'bg-teal-700', 'bg-cyan-700', 'bg-slate-700']

export default function DoctorCard({ doctor, onBook }) {
  const color = avatarColors[doctor.id.charCodeAt(doctor.id.length - 1) % avatarColors.length]

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white ${color}`}>
          {initials(doctor.name)}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold text-slate-900">{doctor.name}</h3>
          <p className="text-sm text-slate-500">{doctor.specialization}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={doctor.available ? 'Available' : doctor.availability} />
            <span className="inline-flex items-center gap-1 text-sm text-amber-600">
              <Star size={14} fill="currentColor" /> {doctor.rating}
              <span className="text-slate-400">({doctor.reviews})</span>
            </span>
          </div>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-400">Experience</dt>
          <dd className="font-medium text-slate-800">{doctor.experience} years</dd>
        </div>
        <div>
          <dt className="text-slate-400">Fee</dt>
          <dd className="font-medium text-slate-800">₹{doctor.fee}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-slate-400">Next available</dt>
          <dd className="font-medium text-slate-800">{doctor.nextSlot} · {doctor.availability}</dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link to={`/doctors?view=${doctor.id}`} className="flex-1">
          <Button variant="secondary" className="w-full" size="sm">
            View Profile
          </Button>
        </Link>
        <Button className="flex-1" size="sm" onClick={() => onBook?.(doctor)}>
          <CalendarDays size={16} />
          Book Appointment
        </Button>
      </div>
    </article>
  )
}
