export default function ResultsLoading() {
  const axisStripColors = [
    'oklch(0.55 0.20 250)',
    'oklch(0.55 0.20 25)',
    'oklch(0.55 0.20 155)',
    'oklch(0.60 0.20 70)',
  ]

  const contextualStripColors = [
    'oklch(0.55 0.18 320)',
    'oklch(0.55 0.18 50)',
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="text-center space-y-4 pt-10">
          <div className="flex justify-center">
            <div className="h-7 w-20 bg-primary/10 animate-pulse rounded-full" />
          </div>
          <div className="h-12 w-3/4 md:w-1/2 mx-auto bg-muted animate-pulse rounded-lg" />
          <div className="h-5 w-1/2 md:w-1/3 mx-auto bg-muted animate-pulse rounded" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Radar Chart Skeleton — glass style */}
          <div className="glass rounded-2xl border-none shadow-xl p-6">
            <div className="h-6 w-40 bg-muted animate-pulse rounded mb-6" />
            <div className="h-[350px] flex items-center justify-center">
              <div className="h-56 w-56 rounded-full border-4 border-dashed border-muted animate-[spin_10s_linear_infinite] opacity-40" />
            </div>
          </div>

          {/* Core Axes Skeleton */}
          <div className="space-y-4">
            <div className="h-7 w-48 bg-muted animate-pulse rounded mb-4" />
            {axisStripColors.map((color, i) => (
              <div key={i} className="bg-card border rounded-xl overflow-hidden animate-pulse">
                {/* Colored top strip */}
                <div className="h-[3px] w-full opacity-50" style={{ backgroundColor: color }} />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-2">
                      <div className="h-5 w-36 bg-muted rounded" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                    <div className="space-y-2 flex flex-col items-end">
                      <div className="h-7 w-14 rounded" style={{ backgroundColor: color, opacity: 0.2 }} />
                      <div className="h-3 w-16 bg-muted rounded" />
                      <div className="h-3 w-20 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full opacity-30"
                      style={{ width: '60%', backgroundColor: color }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="h-2 w-20 bg-muted rounded" />
                    <div className="h-2 w-20 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Modules Skeleton */}
        <div className="space-y-6 pt-8 border-t">
          <div className="text-center space-y-2 mb-8">
            <div className="h-8 w-64 mx-auto bg-muted animate-pulse rounded" />
            <div className="h-4 w-48 mx-auto bg-muted animate-pulse rounded" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {contextualStripColors.map((color, i) => (
              <div key={i} className="bg-card border rounded-xl overflow-hidden animate-pulse">
                <div className="h-[3px] w-full opacity-50" style={{ backgroundColor: color }} />
                <div className="p-5">
                  <div className="h-5 w-32 bg-muted rounded mb-1" />
                  <div className="h-4 w-24 bg-muted rounded mb-4" />
                  <div className="flex justify-between items-end mb-3">
                    <div className="h-8 w-16 rounded" style={{ backgroundColor: color, opacity: 0.2 }} />
                    <div className="space-y-1 flex flex-col items-end">
                      <div className="h-3 w-16 bg-muted rounded" />
                      <div className="h-3 w-20 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="h-3 w-20 bg-muted rounded" />
                    <div className="h-3 w-20 bg-muted rounded" />
                  </div>
                  <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-foreground/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-4 justify-center pt-4">
          <div className="h-10 w-44 bg-muted animate-pulse rounded-xl" />
          <div className="h-10 w-44 bg-muted animate-pulse rounded-xl" />
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-center pb-8">
          <div className="h-3 w-96 bg-muted/50 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}
