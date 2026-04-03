"use client"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

type TCardSetting = {
  title: string
  description?: string
  icon: React.ReactNode
  className?: string
}

export const CardSetting: React.FC<TCardSetting> = ({
  title,
  description,
  icon,
  className,
}) => {
  return (
    <div className={`flex w-full items-center gap-2.5 p-2.5 ` + cn(className)}>
      <div className="text-gray-600">{icon}</div>

      <p className="flex-1 text-lg font-semibold text-gray-600">{title}</p>
      <div className="flex items-center justify-center gap-2.5">
        {description && <p className="text-gray-500">{description}</p>}
        <ChevronRight size={24} className="text-gray-500" />
      </div>
    </div>
  )
}
