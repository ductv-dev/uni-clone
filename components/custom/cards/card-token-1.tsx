"use client"
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

type TcardToken1Props = {
  rank?: number
  name: string
  symbol?: string
  description?: string
  image: string
  number_changes?: number
  price?: number
  onClick?: () => void
  className?: string
}

export const CardToken1: React.FC<TcardToken1Props> = ({
  rank,
  name,
  symbol,
  description,
  image,
  number_changes = 0,
  price,
  onClick,
  className,
}) => {
  return (
    <Link
      onClick={onClick}
      href={`/token/${symbol}`}
      className={
        cn(className) + " flex w-full items-center gap-2.5 rounded-lg px-4 py-2"
      }
    >
      <div className="flex flex-1 items-center gap-2.5">
        {rank && <span className="font-medium text-gray-500">{rank}</span>}

        <Avatar className="h-12 w-12">
          <AvatarImage src={image} alt="token image" />
          <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>

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
        <div className="flex items-center">
          {number_changes > 0 ? (
            <div className="flex">
              <ChevronUp className="h-4 w-4 text-green-500" />
              <span className="text-xs font-medium text-green-500">
                {number_changes}%
              </span>
            </div>
          ) : number_changes < 0 ? (
            <div className="flex">
              <ChevronDown className="h-4 w-4 text-red-500" />
              <span className="text-xs font-medium text-red-500">
                {Math.abs(number_changes)}%
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-gray-500">0%</span>
          )}
        </div>
      </div>
    </Link>
  )
}
