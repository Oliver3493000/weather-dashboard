import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function WeatherSkeleton() {
  return (
    <div className="space-y-8">
      {/* Current Weather Card Skeleton */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 p-8 md:p-12">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-40 w-40 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-20 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-accent/10">
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </Card>

      {/* Forecast Cards Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Card
              key={i}
              className="flex-shrink-0 w-40 md:w-48 bg-card/80 backdrop-blur-sm border-border/50 p-4 md:p-6"
            >
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-20 w-20 rounded-full mx-auto" />
                <Skeleton className="h-8 w-16 mx-auto" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card
            key={i}
            className="bg-card/80 backdrop-blur-sm border-border/50 p-6"
          >
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}
