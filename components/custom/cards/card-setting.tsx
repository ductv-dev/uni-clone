"use client"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

type TCardSetting = {
  title: string
  description?: string
  icon: React.ReactNode
  className?: string
  onClick?: () => void
}

export const CardSetting: React.FC<TCardSetting> = ({
  title,
  description,
  icon,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={
        `flex w-full cursor-pointer items-center gap-2.5 p-2.5 hover:bg-accent ` +
        cn(className)
      }
    >
      <div className="text-foreground/60">{icon}</div>

      <p className="flex-1 text-start text-lg font-semibold text-foreground/60">
        {title}
      </p>
      <div className="flex items-center justify-center gap-2.5">
        {description && <p className="text-foreground/60">{description}</p>}
        <ChevronRight size={24} className="text-foreground/60" />
      </div>
    </div>
  )
}
