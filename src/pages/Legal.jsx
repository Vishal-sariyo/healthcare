import { Link } from 'react-router-dom'

export default function Legal({ type }) {
  const isPrivacy = type === 'privacy'
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900">
        {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
      </h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        {isPrivacy
          ? 'CarePath is a demonstration product. Patient details shown in this app are mock data used to present booking, queue tracking, and record previews. Do not enter real medical information you are not comfortable sharing in a demo environment.'
          : 'By using CarePath you agree to use the booking, queue, and profile features for demonstration and evaluation. Appointments created here are simulated and do not represent a confirmed clinical visit with a licensed provider.'}
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        This interface includes secure login visuals and protected patient information messaging as product design. It does not claim independent certification.
      </p>
      <Link to="/" className="mt-8 inline-block text-sm font-medium text-brand-700">Back to home</Link>
    </div>
  )
}
