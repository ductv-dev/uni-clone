"use client"

import { TUser } from "@/types/type-user"
import { ChevronDown, ChevronUp } from "lucide-react"

type Props = {
  data: TUser
  number_changes: number
}
export const SectionBalance: React.FC<Props> = ({ data, number_changes }) => {
  return (
    <div className="p-2.5">
      <h1 className="text text-3xl font-bold text-foreground/60">
        {data.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
        US$
      </h1>
      {number_changes > 0 ? (
        <div className="flex items-center justify-start gap-1">
          <ChevronUp className="h-6 w-6 text-green-500" />
          <span className="text-lg font-medium text-green-500">
            {number_changes}%
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-start gap-1">
          <ChevronDown className="h-6 w-6 text-red-500" />
          <span className="text-lg font-medium text-red-500">
            {Math.abs(number_changes)}%
          </span>
        </div>
      )}
    </div>
  )
}
