import { useMemo, useState } from 'react'
import MedicalRecordCard from '../components/MedicalRecordCard'
import FilterDropdown from '../components/ui/FilterDropdown'
import Modal from '../components/ui/Modal'
import { medicalRecords } from '../data/mockData'

export default function MedicalRecords({ prescriptionsOnly = false }) {
  const [type, setType] = useState(prescriptionsOnly ? 'Prescription' : 'all')
  const [view, setView] = useState(null)
  const list = useMemo(
    () => medicalRecords.filter((r) => type === 'all' || r.type === type),
    [type],
  )

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        {prescriptionsOnly ? 'Prescriptions' : 'Medical Records'}
      </h1>
      <p className="mt-1 text-sm text-slate-500">Digital copies of visits, labs, and prescriptions.</p>
      {!prescriptionsOnly && (
        <div className="mt-5 max-w-xs">
          <FilterDropdown
            label="Record type"
            value={type}
            onChange={setType}
            options={[
              { value: 'all', label: 'All records' },
              { value: 'Prescription', label: 'Prescription' },
              { value: 'Consultation Summary', label: 'Consultation Summary' },
              { value: 'Lab Report', label: 'Lab Report' },
              { value: 'Diagnostic Report', label: 'Diagnostic Report' },
            ]}
          />
        </div>
      )}
      <div className="mt-5 space-y-3">
        {list.map((record) => (
          <MedicalRecordCard key={record.id} record={record} onView={setView} />
        ))}
      </div>
      <Modal open={Boolean(view)} onClose={() => setView(null)} title={view?.name || 'Record'}>
        {view && (
          <p className="text-sm leading-6 text-slate-600">
            {view.type} prepared by {view.doctor} on {view.date}. This preview represents a protected digital record.
          </p>
        )}
      </Modal>
    </div>
  )
}
