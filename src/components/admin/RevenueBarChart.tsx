interface RevenueBarChartProps {
  data: { month: string; amount: number }[]
}

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  const max = Math.max(...data.map((d) => d.amount))

  return (
    <div className="flex h-48 items-end gap-3">
      {data.map((point) => (
        <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-36 w-full items-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-orbix-600 to-orbix-400 transition-all"
              style={{ height: `${Math.max((point.amount / max) * 100, 4)}%` }}
              title={`${point.amount.toLocaleString('fr-FR')} FCFA`}
            />
          </div>
          <span className="text-xs text-text-muted">{point.month}</span>
        </div>
      ))}
    </div>
  )
}
