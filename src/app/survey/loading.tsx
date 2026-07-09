export default function SurveyLoading() {
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="max-w-2xl mx-auto p-6 md:p-12 space-y-10">
        {/* Progress Bar Skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-1.5 w-full bg-muted animate-pulse rounded-full" />
        </div>

        {/* Question Card Skeleton */}
        <div className="bg-card rounded-2xl border p-8 md:p-12 min-h-[220px] flex flex-col justify-center relative">
          {/* Q badge skeleton */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 h-6 w-10 bg-muted animate-pulse rounded-full" />
          <div className="space-y-3 w-full max-w-[80%] mx-auto mt-4">
            <div className="h-5 w-full bg-muted animate-pulse rounded" />
            <div className="h-5 w-3/4 mx-auto bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Options Skeleton */}
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-6 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-14 md:h-16 bg-muted animate-pulse rounded-full" />
            ))}
          </div>
          {/* Label skeletons */}
          <div className="grid grid-cols-6 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-3 bg-muted/50 animate-pulse rounded mx-1" />
            ))}
          </div>
        </div>

        {/* Next Button Skeleton */}
        <div className="pt-2 flex justify-end">
          <div className="h-11 w-28 bg-muted animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  )
}
