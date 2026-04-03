"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type TCardNoti = {
  title: string
  description: string
  icon: React.ReactNode
  isRequired?: boolean
  className?: string
  setNotification?: (read: boolean) => void
}
export const CardNotification: React.FC<TCardNoti> = ({
  title,
  description,
  icon,
  isRequired,
  className,
  setNotification,
}) => {
  return (
    <div
      className={
        `m-2.5 flex h-27 min-w-[calc(100%-20px)] items-start gap-2.5 rounded-2xl border border-gray-400/20 bg-white px-2.5 py-5 shadow-lg` +
        cn(className)
      }
    >
      <div className="flex items-center justify-center p-2.5">{icon}</div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center">
          <div className="line-clamp-1 flex-1 text-sm font-bold text-gray-600">
            {title}
          </div>
          <div>
            {isRequired ? (
              <Button
                onClick={() => setNotification?.(true)}
                className="flex items-center gap-1 rounded-full bg-blue-700 p-2 text-sm text-white"
              >
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
