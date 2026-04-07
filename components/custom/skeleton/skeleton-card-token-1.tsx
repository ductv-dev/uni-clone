import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardToken1() {
  return (
    <div className="flex w-full items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="">
        <Skeleton className="h-10 w-[300px]" />
      </div>
      <div>
        <Skeleton className="h-10 w-[20px]" />
      </div>
    </div>
  )
}
