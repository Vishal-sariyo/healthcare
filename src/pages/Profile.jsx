import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(user)
  const [saved, setSaved] = useState('')

  const save = (e) => {
    e.preventDefault()
    updateProfile({
      ...form,
      firstName: form.name.split(' ')[0],
    })
    setEditing(false)
    setSaved('Profile updated.')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Profile</h1>
          <p className="mt-1 text-sm text-slate-500">Keep your contact details current for reminders and visits.</p>
        </div>
        {!editing && (
          <Button variant="secondary" onClick={() => setEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
      <form className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm" onSubmit={save}>
        <Input id="name" label="Name" value={form.name} disabled={!editing} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="age" label="Age" value={form.age} disabled={!editing} onChange={(e) => setForm({ ...form, age: e.target.value })} />
          <Input id="gender" label="Gender" value={form.gender} disabled={!editing} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
        </div>
        <Input id="phone" label="Phone" value={form.phone} disabled={!editing} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input id="email" label="Email" value={form.email} disabled={!editing} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input id="address" label="Address" value={form.address} disabled={!editing} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <Input id="emergency" label="Emergency Contact" value={form.emergencyContact} disabled={!editing} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} />
        {saved && <p className="text-sm text-emerald-700">{saved}</p>}
        {editing && (
          <div className="flex gap-2">
            <Button type="submit">Save changes</Button>
            <Button type="button" variant="secondary" onClick={() => { setForm(user); setEditing(false) }}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
