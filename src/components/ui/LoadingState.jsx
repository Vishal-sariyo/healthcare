export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500" role="status" aria-live="polite">
      <span className="h-8 w-8 rounded-full border-2 border-brand-200 border-t-brand-700 animate-spin" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}
