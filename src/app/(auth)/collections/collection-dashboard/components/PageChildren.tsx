import { summaryCards } from '../constants/dashboard'

const PageChildren = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-theme-primary/10 px-3 py-2">
        <h1 className="text-2xl font-semibold text-slate-950">Monthly Collections</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track monthly collection activity and payment progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        { summaryCards.map((card) => (
          <div
            key={ card.label }
            className={ `rounded-md border p-4 shadow-sm ${card.accent}` }
          >
            <p className="text-sm font-medium text-slate-600">{ card.label }</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{ card.value }</p>
            <p className="mt-1 text-xs text-slate-500">{ card.helper }</p>
          </div>
        )) }
      </div>
    </div>
  )
}

export default PageChildren
