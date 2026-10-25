import Button from './ui/Button'

export default function ServiceCard({ service, icon: Icon, onBook }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon size={22} />
      </div>
      <h3 className="font-display text-lg font-semibold text-slate-900">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{service.description}</p>
      <Button className="mt-5" variant="soft" onClick={onBook}>
        Book Now
      </Button>
    </article>
  )
}
