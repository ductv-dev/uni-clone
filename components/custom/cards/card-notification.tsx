"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type TCardNoti = {
  title: string
  description: string
  icon: React.ReactNode
  isRequired?: boolean
  clssName?: string
}
export const CardNotification: React.FC<TCardNoti> = ({
  title,
  description,
  icon,
  isRequired,
  clssName,
}) => {
  return (
    <div
      className={
        `flex items-start gap-2.5 rounded-2xl border border-gray-400/80 bg-white p-2.5` +
        cn(clssName)
      }
    >
      <div className="flex items-center justify-center p-2.5">{icon}</div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center">
          <div className="line-clamp-1 flex-1 text-sm font-bold">{title}</div>
          <div>
            {isRequired ? (
              <Button className="flex items-center gap-1 rounded-full bg-blue-700 p-2 text-sm text-white">
                <X size={12} strokeWidth={2} />
              </Button>
            ) : (
              <span className="rounded-full bg-red-400 px-2 py-1 text-xs text-white">
                Bắt buộc
              </span>
            )}
          </div>
        </div>
        <div className="line-clamp-2 text-sm text-gray-500">{description}</div>
      </div>
    </div>
  )
}
