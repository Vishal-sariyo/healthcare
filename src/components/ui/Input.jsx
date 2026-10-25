export default function Input({
  label,
  id,
  error,
  hint,
  icon: Icon,
  rightSlot,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" size={18} />
        )}
        <input
          id={id}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition
            ${Icon ? 'pl-10' : ''} ${rightSlot ? 'pr-11' : ''}
            ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'}
            focus:outline-none focus:ring-4 min-h-11`}
          {...props}
        />
        {rightSlot && <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error ? <p className="mt-1.5 text-sm text-rose-600">{error}</p> : hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
}
