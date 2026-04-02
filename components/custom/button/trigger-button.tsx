"use client"

import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

type TTriggerButton = {
  icon: keyof typeof Icons
  title: string
  className?: string
  onClick?: () => void
}
export const TriggerButton: React.FC<TTriggerButton> = ({
  icon,
  title,
  className,
  onClick,
}) => {
  const Icon = Icons[icon]

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex max-w-50 flex-col items-start gap-2.5 rounded-xl border-none bg-blue-100 p-4",
        className
      )}
    >
      {Icon ? <Icon className="h-5 w-5 text-blue-800" /> : <span>{icon}</span>}
      <p className="text-start text-sm font-semibold text-blue-800">{title}</p>
    </button>
  )
}
