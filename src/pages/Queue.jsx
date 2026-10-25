import { Link } from 'react-router-dom'
import QueueTracker from '../components/QueueTracker'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useAppState } from '../context/AppContext'
import { Ticket } from 'lucide-react'

export default function Queue() {
  const { upcoming } = useAppState()
  if (!upcoming || upcoming.status !== 'Confirmed') {
    return (
      <EmptyState
        icon={Ticket}
        title="No active queue"
        description="Once you confirm an in-clinic visit, your token and wait time will appear here."
        action={<Link to="/book-appointment"><Button>Book Appointment</Button></Link>}
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Queue Status</h1>
        <p className="mt-1 text-sm text-slate-500">Live token tracking for your visit with {upcoming.doctorName}.</p>
      </div>
      <QueueTracker appointment={upcoming} />
      <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="font-display font-semibold text-slate-900">Visit details</h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div><dt className="text-slate-400">Doctor</dt><dd>{upcoming.doctorName}</dd></div>
          <div><dt className="text-slate-400">Date</dt><dd>{upcoming.displayDate}</dd></div>
          <div><dt className="text-slate-400">Time</dt><dd>{upcoming.time}</dd></div>
          <div><dt className="text-slate-400">Clinic</dt><dd>CarePath Health Centre</dd></div>
        </dl>
      </article>
    </div>
  )
}
