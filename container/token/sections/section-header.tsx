"use client"

import { ButtonNav } from "@/components/custom/button/button-navigation"
import { ChevronLeft } from "lucide-react"

export const SectionHeader = () => {
  return (
    <div className="fixed top-0 w-full">
      <div className="flex w-full border-b border-gray-300 p-2.5">
        <ButtonNav>
          <ChevronLeft />
        </ButtonNav>
      </div>
    </div>
  )
}
