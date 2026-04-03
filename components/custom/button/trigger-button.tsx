"use client"

import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

type TTriggerButton = {
  icon: keyof typeof Icons
  title?: string
  className?: string
}
export const TriggerButton: React.FC<TTriggerButton> = ({
  icon,
  title,
  className,
}) => {
  const Icon = Icons[icon]

  return (
    <div
      className={cn(
        "flex max-w-50 flex-col items-start gap-2.5 rounded-xl border-none bg-blue-100 p-4",
        className
      )}
    >
      {Icon ? <Icon className="h-5 w-5 text-blue-800" /> : <span>{icon}</span>}
      {title && (
        <p className="text-start text-sm font-semibold text-blue-800">
          {title}
        </p>
      )}
    </div>
  )
}
