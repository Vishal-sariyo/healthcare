import {
  CalendarDays,
  ClipboardList,
  FileText,
  Ticket,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppointmentCard, { AppointmentActions } from '../components/AppointmentCard'
import MedicalRecordCard from '../components/MedicalRecordCard'
import NotificationCard from '../components/NotificationCard'
import QueueTracker from '../components/QueueTracker'
import Button from '../components/ui/Button'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import Modal from '../components/ui/Modal'
import { useAppState } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { medicalRecords } from '../data/mockData'

export default function Dashboard() {
  const { user } = useAuth()
  const { appointments, upcoming, notifications, updateAppointment, markNotificationRead } = useAppState()
  const navigate = useNavigate()
  const [cancelId, setCancelId] = useState(null)
  const [viewApt, setViewApt] = useState(null)
  const [record, setRecord] = useState(null)

  const totals = {
    records: medicalRecords.length,
    all: appointments.length,
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={CalendarDays} label="Upcoming Appointment" value={upcoming?.displayDate || 'None'} hint={upcoming ? upcoming.time : 'No visit scheduled'} />
        <SummaryCard icon={Ticket} label="Active Queue" value={upcoming?.token || '—'} hint="Current token number" />
        <SummaryCard icon={ClipboardList} label="Appointments" value={totals.all} hint="Total appointments" />
        <SummaryCard icon={FileText} label="Medical Records" value={totals.records} hint="Available records" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-3">
          <h2 className="font-display text-lg font-semibold text-slate-900">Current / upcoming appointment</h2>
          {upcoming ? (
            <>
              <div className="mt-4">
                <h3 className="font-display text-xl font-bold text-slate-900">{upcoming.doctorName}</h3>
                <p className="text-sm text-slate-500">{upcoming.specialization}</p>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <Item label="Appointment" value={`${upcoming.displayDate}\n${upcoming.time}`} />
                <Item label="Token" value={upcoming.token} />
                <Item label="Patients Ahead" value={upcoming.patientsAhead} />
                <Item label="Estimated Waiting Time" value={`${upcoming.estimatedWait} minutes`} />
                <Item label="Status" value={upcoming.status} />
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <AppointmentActions
                  onView={() => setViewApt(upcoming)}
                  onTrack={() => navigate('/queue')}
                  onReschedule={() => navigate('/book-appointment')}
                  onCancel={() => setCancelId(upcoming.id)}
                />
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No upcoming appointment.</p>
          )}
        </article>
        <div className="lg:col-span-2">
          <QueueTracker appointment={upcoming} />
        </div>
      </div>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-700 px-6 py-6 text-white sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-semibold">Need to see a doctor?</h2>
          <p className="mt-1 text-sm text-brand-100">Book a visit in a few steps and get a live token.</p>
        </div>
        <Link to="/book-appointment">
          <Button className="bg-white text-brand-800 hover:bg-brand-50">Book New Appointment</Button>
        </Link>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900">Recent appointments</h2>
          <Link to="/appointments" className="text-sm font-medium text-brand-700">View all</Link>
        </div>
        <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                {['Doctor', 'Specialization', 'Date', 'Time', 'Type', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 4).map((apt) => (
                <tr key={apt.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{apt.doctorName}</td>
                  <td className="px-4 py-3 text-slate-600">{apt.specialization}</td>
                  <td className="px-4 py-3 text-slate-600">{apt.displayDate}</td>
                  <td className="px-4 py-3 text-slate-600">{apt.time}</td>
                  <td className="px-4 py-3 text-slate-600">{apt.type}</td>
                  <td className="px-4 py-3"><span className="text-xs font-semibold">{apt.status}</span></td>
                  <td className="px-4 py-3">
                    <button type="button" className="text-brand-700 hover:underline" onClick={() => setViewApt(apt)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 md:hidden">
          {appointments.slice(0, 3).map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              actions={<AppointmentActions compact onView={() => setViewApt(apt)} />}
            />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-slate-900">Recent Medical Records</h2>
          <div className="space-y-3">
            {medicalRecords.slice(0, 4).map((item) => (
              <MedicalRecordCard key={item.id} record={item} onView={setRecord} />
            ))}
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-slate-900">Notifications</h2>
            <Link to="/notifications" className="text-sm font-medium text-brand-700">See all</Link>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <NotificationCard key={n.id} notification={n} onRead={markNotificationRead} />
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900">Patient profile</h2>
          <Link to="/profile"><Button size="sm" variant="secondary">Edit Profile</Button></Link>
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Item label="Name" value={user.name} />
          <Item label="Age" value={user.age} />
          <Item label="Gender" value={user.gender} />
          <Item label="Phone" value={user.phone} />
          <Item label="Email" value={user.email} />
          <Item label="Emergency Contact" value={user.emergencyContact} />
          <div className="sm:col-span-2"><Item label="Address" value={user.address} /></div>
        </dl>
      </section>

      <ConfirmationModal
        open={Boolean(cancelId)}
        onClose={() => setCancelId(null)}
        title="Cancel appointment?"
        description="This visit will be marked as cancelled. You can book a new time whenever you are ready."
        confirmLabel="Cancel Appointment"
        danger
        onConfirm={() => {
          updateAppointment(cancelId, { status: 'Cancelled' })
          setCancelId(null)
        }}
      />
      <Modal open={Boolean(viewApt)} onClose={() => setViewApt(null)} title="Appointment details">
        {viewApt && (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Item label="Doctor" value={viewApt.doctorName} />
            <Item label="Specialization" value={viewApt.specialization} />
            <Item label="Date" value={viewApt.displayDate} />
            <Item label="Time" value={viewApt.time} />
            <Item label="Type" value={viewApt.type} />
            <Item label="Token" value={viewApt.token} />
            <Item label="Status" value={viewApt.status} />
          </dl>
        )}
      </Modal>
      <Modal open={Boolean(record)} onClose={() => setRecord(null)} title={record?.name || 'Record'}>
        {record && <p className="text-sm text-slate-600">{record.type} from {record.doctor} on {record.date}. This is a preview of your digital record.</p>}
      </Modal>
    </div>
  )
}

function SummaryCard({ icon: Icon, label, value, hint }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="rounded-xl bg-brand-50 p-2 text-brand-700"><Icon size={18} /></span>
      </div>
      <p className="mt-2 font-display text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </article>
  )
}

function Item({ label, value }) {
  return (
    <div>
      <dt className="text-slate-400">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-line font-medium text-slate-800">{value}</dd>
    </div>
  )
}
