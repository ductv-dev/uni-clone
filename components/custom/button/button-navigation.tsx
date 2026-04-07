"use client"

import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"

type TButtonNav = {
  classname?: string
  children?: React.ReactNode
  onClick?: () => void
}

export const ButtonNav: React.FC<TButtonNav> = ({
  classname,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={
        cn(classname) +
        `flex h-12 items-center justify-center rounded-full border-t border-black/10 bg-white px-4 shadow-lg shadow-black/10 hover:bg-gray-100`
      }
    >
      {children}
    </button>
  )
}
