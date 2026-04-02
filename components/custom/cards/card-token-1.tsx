"use client"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

type TcardToken1Props = {
  rank?: number
  name: string
  symbol?: string
  description?: string
  image: string
  number_changes?: number
  price?: number
}

export const CardToken1: React.FC<TcardToken1Props> = ({
  rank,
  name,
  symbol,
  description,
  image,
  number_changes,
  price,
}) => {
  return (
    <div className={cn("flex w-full items-center gap-2.5 rounded-lg p-4")}>
      <div className="flex flex-1 items-center gap-2.5">
        {rank && <span className="font-medium text-gray-500">{rank}</span>}
        <div className="relative h-12 w-12 flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          {symbol && <span className="text-xs text-gray-500">{symbol}</span>}
        </div>
      </div>
      <div className="flex flex-col items-end">
        {price && (
          <span className="text-sm font-medium">
            {price.toLocaleString(undefined, { minimumFractionDigits: 2 })} US$
          </span>
        )}
        {description && (
          <span className="text-xs text-gray-500">{description}</span>
        )}
        {number_changes && (
          <div className="flex items-center">
            {number_changes > 0 ? (
              <div className="flex">
                <ChevronUp className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-green-500">
                  {number_changes}%
                </span>
              </div>
            ) : (
              <div className="flex">
                <ChevronDown className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium text-red-500">
                  {Math.abs(number_changes)}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
