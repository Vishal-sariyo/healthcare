export default function Logo({ className = '', light = false }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${light ? 'bg-white/15 text-white' : 'bg-brand-700 text-white'}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M10.5 4.5h3v5.25H19v3h-5.5V18h-3v-5.25H5v-3h5.5V4.5Z" fill="currentColor" />
        </svg>
      </span>
      <span className={`font-display text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}>
        CarePath
      </span>
    </div>
  )
}
