"use client"

import { ButtonNav } from "@/components/custom/button/button-navigation"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const SectionHeader = () => {
  const route = useRouter()
  return (
    <div className="fixed top-0 z-30 w-full bg-white/50 backdrop-blur-2xl">
      <div className="flex w-full border-b border-gray-300 p-2.5">
        <ButtonNav onClick={() => route.back()}>
          <ChevronLeft />
        </ButtonNav>
      </div>
    </div>
  )
}
