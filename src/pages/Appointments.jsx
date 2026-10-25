import { CalendarX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentCard, { AppointmentActions } from '../components/AppointmentCard'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import EmptyState from '../components/ui/EmptyState'
import FilterDropdown from '../components/ui/FilterDropdown'
import Modal from '../components/ui/Modal'
import { useAppState } from '../context/AppContext'

const tabs = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled']

export default function Appointments() {
  const { appointments, updateAppointment } = useAppState()
  const navigate = useNavigate()
  const [tab, setTab] = useState('All')
  const [type, setType] = useState('all')
  const [view, setView] = useState(null)
  const [cancelId, setCancelId] = useState(null)

  const list = useMemo(
    () => appointments.filter((a) => (tab === 'All' || a.status === tab) && (type === 'all' || a.type === type)),
    [appointments, tab, type],
  )

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-slate-900">Your Appointments</h1>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${tab === item ? 'bg-brand-700 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <FilterDropdown
          label="Consultation type"
          value={type}
          onChange={setType}
          options={[{ value: 'all', label: 'All types' }, { value: 'In-person', label: 'In-person' }, { value: 'Online', label: 'Online' }]}
        />
      </div>
      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={CalendarX} title="No appointments here" description="Book a visit to see it in your history." />
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {list.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              actions={
                <AppointmentActions
                  onView={() => setView(apt)}
                  onTrack={apt.status === 'Confirmed' ? () => navigate('/queue') : undefined}
                  onReschedule={apt.status === 'Confirmed' || apt.status === 'Pending' ? () => navigate('/book-appointment') : undefined}
                  onCancel={apt.status === 'Confirmed' || apt.status === 'Pending' ? () => setCancelId(apt.id) : undefined}
                />
              }
            />
          ))}
        </div>
      )}
      <Modal open={Boolean(view)} onClose={() => setView(null)} title="Appointment details">
        {view && (
          <p className="text-sm text-slate-600">
            {view.doctorName} · {view.displayDate} · {view.time} · Token {view.token} · {view.status}
          </p>
        )}
      </Modal>
      <ConfirmationModal
        open={Boolean(cancelId)}
        onClose={() => setCancelId(null)}
        title="Cancel appointment?"
        description="This visit will be cancelled. You can book another slot at any time."
        confirmLabel="Cancel Appointment"
        danger
        onConfirm={() => {
          updateAppointment(cancelId, { status: 'Cancelled' })
          setCancelId(null)
        }}
      />
    </div>
  )
}
