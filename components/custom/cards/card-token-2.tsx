"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

type TCardToken2 = {
  image: string
  name: string
  price: number
  number_changes?: number
  className?: string
  onClick?: () => void
}

export const CardToken2: React.FC<TCardToken2> = ({
  image,
  name,
  price,
  number_changes,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={
        `w-full max-w-50 rounded-[10px] border border-border p-2.5` +
        cn(className)
      }
    >
      <div className="flex items-center gap-2.5">
        <div className="relative h-6 w-6 shrink-0">
          <img
            src={image}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <p className="flex-1 text-lg">{name}</p>
      </div>

      <p className="font-semibold text-foreground/60">
        {price.toLocaleString(undefined, { minimumFractionDigits: 2 })} US$
      </p>

      {(number_changes ?? 0) > 0 ? (
        <div className="flex items-center">
          <ChevronUp className="h-4 w-4 text-green-500" />
          <span className="font-medium text-green-500">{number_changes}%</span>
        </div>
      ) : (
        <div className="flex items-center">
          <ChevronDown className="h-4 w-4 text-red-500" />
          <span className="font-medium text-red-500">
            {Math.abs(number_changes ?? 0)}%
          </span>
        </div>
      )}
    </div>
  )
}
