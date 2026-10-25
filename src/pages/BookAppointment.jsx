import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAppState } from '../context/AppContext'
import { departments, doctors, timeSlots } from '../data/mockData'

const steps = ['Doctor', 'Date & Time', 'Confirmation']

export default function BookAppointment() {
  const { bookingDraft, setBookingDraft, addAppointment } = useAppState()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    department: bookingDraft?.department || '',
    doctorId: bookingDraft?.doctorId || '',
    date: bookingDraft?.date || '2026-09-18',
    time: bookingDraft?.time || '',
    type: bookingDraft?.type || 'In-person',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(null)

  const filtered = useMemo(
    () => (form.department ? doctors.filter((d) => d.department === form.department) : doctors),
    [form.department],
  )
  const doctor = doctors.find((d) => d.id === form.doctorId)

  const next = () => {
    if (step === 0 && (!form.department || !form.doctorId)) {
      setError('Select a department and doctor to continue.')
      return
    }
    if (step === 1 && (!form.date || !form.time || !form.type)) {
      setError('Select a date, time, and appointment type.')
      return
    }
    setError('')
    setStep((s) => s + 1)
  }

  const confirm = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    const token = `${(doctor?.department || 'G')[0]}-${Math.floor(20 + Math.random() * 20)}`
    const appointment = {
      id: `apt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: form.date,
      displayDate: new Date(`${form.date}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: form.time,
      type: form.type === 'Online' ? 'Online' : 'In-person',
      token,
      nowServing: `${token.split('-')[0]}-${Number(token.split('-')[1]) - 4}`,
      patientsAhead: 4,
      estimatedWait: 20,
      status: 'Confirmed',
      department: doctor.department,
    }
    addAppointment(appointment)
    setBookingDraft(null)
    setDone(appointment)
    setSaving(false)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">Appointment confirmed</p>
        <h1 className="font-display mt-2 text-2xl font-bold text-slate-900">You are booked</h1>
        <p className="mt-2 text-sm text-slate-600">
          {done.doctorName} · {done.displayDate} at {done.time}
        </p>
        <p className="mt-4 font-display text-3xl font-bold text-brand-700">Token {done.token}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => navigate('/queue')}>Track Queue</Button>
          <Button variant="secondary" onClick={() => navigate('/appointments')}>My Appointments</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-slate-900">Book Appointment</h1>
      <ol className="mt-5 flex gap-2">
        {steps.map((label, i) => (
          <li key={label} className={`flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold sm:text-sm ${i <= step ? 'bg-brand-700 text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200'}`}>
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        {step === 0 && (
          <div className="space-y-4">
            <Select label="Select Department" value={form.department} onChange={(v) => setForm({ ...form, department: v, doctorId: '' })} options={['', ...departments]} />
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Select Doctor</p>
              <div className="grid gap-3">
                {filtered.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setForm({ ...form, doctorId: d.id, department: d.department })}
                    className={`rounded-xl border p-4 text-left ${form.doctorId === d.id ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`}
                  >
                    <p className="font-semibold text-slate-900">{d.name}</p>
                    <p className="text-sm text-slate-500">{d.specialization} · ₹{d.fee} · {d.availability}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Select Date
              <input type="date" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </label>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Select Available Time</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {timeSlots.map((t) => (
                  <button key={t} type="button" onClick={() => setForm({ ...form, time: t })} className={`rounded-xl border px-3 py-2 text-sm ${form.time === t ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-slate-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Appointment Type</p>
              <div className="grid grid-cols-2 gap-2">
                {['In-person', 'Online'].map((type) => (
                  <button key={type} type="button" onClick={() => setForm({ ...form, type })} className={`rounded-xl border px-3 py-2.5 text-sm font-medium ${form.type === type ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-slate-200'}`}>
                    {type === 'Online' ? 'Online consultation' : type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && doctor && (
          <div className="space-y-3 text-sm">
            <Row label="Doctor" value={doctor.name} />
            <Row label="Department" value={doctor.department} />
            <Row label="Date" value={form.date} />
            <Row label="Time" value={form.time} />
            <Row label="Type" value={form.type === 'Online' ? 'Online consultation' : 'In-person'} />
            <Row label="Fee" value={`₹${doctor.fee}`} />
          </div>
        )}

        {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
        <div className="mt-6 flex justify-between">
          <Button variant="secondary" onClick={() => { setError(''); setStep((s) => Math.max(0, s - 1)) }} disabled={step === 0}>
            Back
          </Button>
          {step < 2 ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button onClick={confirm} loading={saving}>Confirm Appointment</Button>
          )}
        </div>
      </div>
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <select className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt || 'all'} value={opt}>{opt || 'Choose department'}</option>
        ))}
      </select>
    </label>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  )
}
