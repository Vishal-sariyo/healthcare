import { Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { clinicInfo } from '../data/mockData'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            CarePath helps patients book appointments, skip long waiting rooms, and track their queue in real time.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-white">Doctors</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/book-appointment" className="hover:text-white">Book Appointment</Link></li>
            <li><a href="/#faq" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>General Consultation</li>
            <li>Specialist Consultation</li>
            <li>Online Consultation</li>
            <li>Diagnostic Services</li>
            <li>Preventive Healthcare</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" /> {clinicInfo.phone}</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0" /> {clinicInfo.email}</li>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {clinicInfo.address}</li>
          </ul>
          <div className="mt-5 flex gap-2">
            <Social icon={Globe} label="Website" />
            <Social icon={Share2} label="Share" />
            <Social icon={Mail} label="Email" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} CarePath. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Social({ icon: Icon, label }) {
  return (
    <a
      href="#contact"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
    >
      <Icon size={16} />
    </a>
  )
}
