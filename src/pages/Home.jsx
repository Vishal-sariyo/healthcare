import {
  Activity,
  Bell,
  CalendarCheck,
  ChevronDown,
  Clock,
  FileHeart,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Ticket,
  UserRound,
  Video,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard'
import QueueTracker from '../components/QueueTracker'
import ServiceCard from '../components/ServiceCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAppState } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import {
  clinicInfo,
  departments,
  doctors,
  faqs,
  features,
  services,
  testimonials,
  timeSlots,
  whyChooseUs,
} from '../data/mockData'

const serviceIcons = [Stethoscope, HeartPulse, Video, CalendarCheck, Activity, ShieldCheck]
const featureIcons = [CalendarCheck, Clock, Ticket, Bell, Stethoscope, FileHeart, ShieldCheck, Video, Clock, Bell]

export default function Home() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { upcoming, setBookingDraft } = useAppState()
  const [openFaq, setOpenFaq] = useState(faqs[0].id)
  const [booking, setBooking] = useState({
    department: '',
    doctorId: '',
    date: '2026-09-12',
    time: '',
    type: 'In-person',
  })
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactMsg, setContactMsg] = useState('')
  const [stepError, setStepError] = useState('')

  const filteredDoctors = booking.department
    ? doctors.filter((d) => d.department === booking.department)
    : doctors

  const goBook = (doctor) => {
    if (doctor) setBookingDraft({ doctorId: doctor.id, department: doctor.department })
    navigate(isAuthenticated ? '/book-appointment' : '/login')
  }

  const continueBooking = () => {
    if (!booking.department || !booking.doctorId || !booking.date || !booking.time) {
      setStepError('Please select department, doctor, date, and time to continue.')
      return
    }
    setBookingDraft(booking)
    navigate(isAuthenticated ? '/book-appointment' : '/login')
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Modern patient care</p>
            <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Book Your Appointment. Skip the Waiting.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
              Find the right doctor, choose a convenient time, book your appointment, and track your queue — all from one place.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button size="lg" onClick={() => goBook()}>Book Appointment</Button>
              <Link to="/doctors"><Button size="lg" variant="secondary">Find a Doctor</Button></Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 lg:justify-start">
              <span className="inline-flex items-center gap-1"><ShieldCheck size={14} /> Secure patient login</span>
              <span>Protected patient information</span>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section id="booking" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Book Your Appointment</h2>
              <p className="mt-1 text-sm text-slate-500">A clear 3-step path from doctor to confirmation.</p>
            </div>
            <ol className="flex gap-2 text-xs font-semibold sm:text-sm">
              {['Doctor', 'Date & Time', 'Confirmation'].map((label, i) => (
                <li key={label} className={`rounded-full px-3 py-1 ${i === 0 ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {i + 1}. {label}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Field label="Select Department">
              <select className="field" value={booking.department} onChange={(e) => setBooking({ ...booking, department: e.target.value, doctorId: '' })}>
                <option value="">Choose department</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Select Doctor">
              <select className="field" value={booking.doctorId} onChange={(e) => setBooking({ ...booking, doctorId: e.target.value })}>
                <option value="">Choose doctor</option>
                {filteredDoctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </Field>
            <Field label="Select Date">
              <input className="field" type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} />
            </Field>
            <Field label="Select Available Time">
              <select className="field" value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })}>
                <option value="">Choose time</option>
                {timeSlots.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Appointment Type">
              <div className="grid grid-cols-2 gap-2">
                {['In-person', 'Online'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBooking({ ...booking, type })}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium ${booking.type === type ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-slate-200 text-slate-600'}`}
                  >
                    {type === 'Online' ? 'Online consultation' : type}
                  </button>
                ))}
              </div>
            </Field>
          </div>
          {stepError && <p className="mt-3 text-sm text-rose-600">{stepError}</p>}
          <Button className="mt-6" onClick={continueBooking}>Continue to Booking</Button>
        </div>
      </section>

      <section id="services" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="Healthcare Services" subtitle="Care options designed around how patients actually book and visit." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} icon={serviceIcons[i]} onBook={() => goBook()} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading title="Find the Right Doctor" subtitle="Filter by specialty, availability, and consultation type." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 6).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={goBook} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/doctors"><Button variant="secondary">View all doctors</Button></Link>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="How it works" subtitle="Four simple steps from search to your token." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'Find a Doctor'],
              ['02', 'Choose Date & Time'],
              ['03', 'Confirm Appointment'],
              ['04', 'Track Your Queue'],
            ].map(([num, title]) => (
              <div key={num} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <p className="font-display text-3xl font-bold text-brand-700">{num}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading title="Everything You Need for a Better Healthcare Experience" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, i) => {
            const Icon = featureIcons[i]
            return (
              <article key={feature.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <Icon className="text-brand-700" size={20} />
                <h3 className="mt-3 font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Upcoming appointment</h2>
            <p className="mt-1 text-sm text-slate-500">A live preview of how visits appear after booking.</p>
            <article className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h3 className="font-display text-xl font-semibold">{upcoming.doctorName}</h3>
              <p className="text-slate-500">{upcoming.specialization}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-slate-400">Date</dt><dd className="font-medium">{upcoming.displayDate}</dd></div>
                <div><dt className="text-slate-400">Time</dt><dd className="font-medium">{upcoming.time}</dd></div>
                <div><dt className="text-slate-400">Token</dt><dd className="font-medium">{upcoming.token}</dd></div>
                <div><dt className="text-slate-400">Status</dt><dd className="font-medium text-emerald-700">{upcoming.status}</dd></div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to={isAuthenticated ? '/appointments' : '/login'}><Button>View Appointment</Button></Link>
                <Link to={isAuthenticated ? '/queue' : '/login'}><Button variant="secondary">Track Queue</Button></Link>
              </div>
            </article>
          </div>
          <QueueTracker appointment={upcoming} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading title="Why choose us" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="What patients say" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <article key={t.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <p className="text-amber-500">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">“{t.quote}”</p>
                <p className="mt-4 font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionHeading title="Frequently asked questions" />
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-100 bg-white">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                aria-expanded={openFaq === faq.id}
              >
                <span className="font-medium text-slate-900">{faq.question}</span>
                <ChevronDown className={`shrink-0 text-slate-400 transition ${openFaq === faq.id ? 'rotate-180' : ''}`} size={18} />
              </button>
              {openFaq === faq.id && <p className="px-5 pb-4 text-sm leading-6 text-slate-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Contact Us</h2>
            <p className="mt-2 text-sm text-slate-500">Reach the CarePath team for booking help or clinic questions.</p>
            <ul className="mt-6 space-y-4 text-sm text-slate-700">
              <li className="flex gap-3"><Phone size={18} className="text-brand-700" /> {clinicInfo.phone}</li>
              <li className="flex gap-3"><Mail size={18} className="text-brand-700" /> {clinicInfo.email}</li>
              <li className="flex gap-3"><MapPin size={18} className="text-brand-700" /> {clinicInfo.address}</li>
              <li className="flex gap-3"><Clock size={18} className="text-brand-700" /> {clinicInfo.hours}</li>
            </ul>
          </div>
          <form
            className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-6"
            onSubmit={(e) => {
              e.preventDefault()
              if (!contact.name || !contact.email || !contact.message) {
                setContactMsg('Please complete name, email, and message.')
                return
              }
              setContactMsg('Message sent. Our team will reply during working hours.')
              setContact({ name: '', email: '', phone: '', message: '' })
            }}
          >
            <Input id="cname" label="Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            <Input id="cemail" label="Email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            <Input id="cphone" label="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            <label className="block text-sm font-medium text-slate-700">
              Message
              <textarea
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                rows={4}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
              />
            </label>
            {contactMsg && <p className="text-sm text-brand-800">{contactMsg}</p>}
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </section>
      <style>{`
        .field { width: 100%; border-radius: 0.75rem; border: 1px solid #e2e8f0; padding: 0.65rem 0.85rem; font-size: 0.875rem; min-height: 2.75rem; background: #fff; }
        .field:focus { outline: none; border-color: #14b8a6; box-shadow: 0 0 0 4px #ccfbf1; }
      `}</style>
    </div>
  )
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-slate-500 sm:text-base">{subtitle}</p>}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="rounded-3xl bg-brand-50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white">
            <UserRound size={22} />
          </span>
          <div>
            <p className="font-semibold text-slate-900">Dr. Rahul Sharma</p>
            <p className="text-sm text-slate-500">General Physician · Token A-24</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-xl bg-white p-3"><p className="text-xs text-slate-400">Now serving</p><p className="font-bold">A-19</p></div>
          <div className="rounded-xl bg-white p-3"><p className="text-xs text-slate-400">Ahead</p><p className="font-bold">5</p></div>
          <div className="rounded-xl bg-white p-3"><p className="text-xs text-slate-400">Wait</p><p className="font-bold">25 min</p></div>
        </div>
      </div>
    </div>
  )
}
