import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import FilterDropdown from '../components/ui/FilterDropdown'
import Modal from '../components/ui/Modal'
import SearchBar from '../components/ui/SearchBar'
import { useAppState } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { doctors } from '../data/mockData'
import { Stethoscope } from 'lucide-react'

export default function Doctors() {
  const [params, setParams] = useSearchParams()
  const { isAuthenticated } = useAuth()
  const { setBookingDraft } = useAppState()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [spec, setSpec] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [consult, setConsult] = useState('all')
  const [rating, setRating] = useState('all')
  const viewId = params.get('view')
  const viewed = doctors.find((d) => d.id === viewId)

  const list = useMemo(() => {
    return doctors.filter((d) => {
      const q = query.toLowerCase()
      const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q)
      const matchesSpec = spec === 'all' || d.specialization === spec
      const matchesAvail = availability === 'all' || (availability === 'today' ? d.available : !d.available)
      const matchesConsult = consult === 'all' || d.consultationTypes.includes(consult)
      const matchesRating = rating === 'all' || d.rating >= Number(rating)
      return matchesQuery && matchesSpec && matchesAvail && matchesConsult && matchesRating
    })
  }, [query, spec, availability, consult, rating])

  const book = (doctor) => {
    setBookingDraft({ doctorId: doctor.id, department: doctor.department })
    navigate(isAuthenticated ? '/book-appointment' : '/login')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900">Find the Right Doctor</h1>
      <p className="mt-2 text-slate-500">Search doctors by name or specialization and filter what matters to you.</p>
      <div className="mt-6 grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-5">
        <SearchBar className="lg:col-span-2" value={query} onChange={setQuery} placeholder="Search doctors by name or specialization" />
        <FilterDropdown label="Specialization" value={spec} onChange={setSpec} options={[{ value: 'all', label: 'All' }, ...[...new Set(doctors.map((d) => d.specialization))].map((s) => ({ value: s, label: s }))]} />
        <FilterDropdown label="Availability" value={availability} onChange={setAvailability} options={[{ value: 'all', label: 'Any' }, { value: 'today', label: 'Available Today' }, { value: 'later', label: 'Available Tomorrow' }]} />
        <FilterDropdown label="Consultation type" value={consult} onChange={setConsult} options={[{ value: 'all', label: 'Any' }, { value: 'In-person', label: 'In-person' }, { value: 'Online', label: 'Online' }]} />
        <FilterDropdown className="lg:col-span-1" label="Rating" value={rating} onChange={setRating} options={[{ value: 'all', label: 'Any' }, { value: '4.8', label: '4.8+' }, { value: '4.5', label: '4.5+' }]} />
      </div>
      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={Stethoscope} title="No doctors match your filters" description="Try another specialization or clear search." />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={book} />
          ))}
        </div>
      )}
      <Modal
        open={Boolean(viewed)}
        onClose={() => { params.delete('view'); setParams(params) }}
        title={viewed?.name || 'Doctor'}
        footer={viewed && <Button onClick={() => book(viewed)}>Book Appointment</Button>}
      >
        {viewed && (
          <div className="space-y-2 text-sm text-slate-600">
            <p>{viewed.specialization} · {viewed.experience} years · ₹{viewed.fee}</p>
            <p>{viewed.bio}</p>
            <p>Languages: {viewed.languages.join(', ')}</p>
            <p>Clinic: {viewed.clinic}</p>
            <p>Consultation: {viewed.consultationTypes.join(', ')}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
