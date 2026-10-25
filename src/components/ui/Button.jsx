export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
  const sizes = {
    sm: 'px-3.5 py-2 text-sm min-h-10',
    md: 'px-5 py-2.5 text-sm min-h-11',
    lg: 'px-6 py-3 text-base min-h-12',
  }
  const variants = {
    primary: 'bg-brand-700 text-white shadow-sm hover:bg-brand-800',
    secondary: 'bg-white text-brand-800 border border-slate-200 hover:border-brand-300 hover:bg-brand-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
    soft: 'bg-brand-50 text-brand-800 hover:bg-brand-100',
  }

  return (
    <button type={type} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {loading && (
        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden />
      )}
      {children}
    </button>
  )
}
