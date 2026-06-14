import SVG, { type IconType } from '@/src/components/Svg'

type DashboardMetric = {
  id: string
  label: string
  value: string
  helper: string
  icon: IconType
  tone: string
}

const metrics: DashboardMetric[] = [
  {
    id: 'total-members',
    label: 'Total Members',
    value: '410',
    helper: 'Registered collection members',
    icon: 'users',
    tone: 'bg-blue-50 text-blue-700'
  },
  {
    id: 'total-amount',
    label: 'Total Amount',
    value: 'Rs. 1,025,000',
    helper: 'Expected monthly collection',
    icon: 'wallet',
    tone: 'bg-green-50 text-green-700'
  },
  {
    id: 'not-payable-members',
    label: 'Not Payable Members',
    value: '29',
    helper: 'Members currently marked unpaid',
    icon: 'reports',
    tone: 'bg-red-50 text-red-700'
  }
]

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of members and monthly collection status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        { metrics.map((metric) => (
          <div
            key={ metric.id }
            className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{ metric.label }</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">{ metric.value }</p>
              </div>

              <span
                className={ `flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${metric.tone}` }
              >
                <SVG type={ metric.icon } width={ 20 } height={ 20 } />
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-500">{ metric.helper }</p>
          </div>
        )) }
      </div>
    </div>
  )
}

export default Dashboard
