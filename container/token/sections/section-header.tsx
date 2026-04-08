"use client"

import { ButtonNav } from "@/components/custom/button/button-navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const SectionHeader = () => {
  const route = useRouter()
  return (
    <div className="fixed top-0 z-30 w-full bg-background">
      <div className="flex w-full border-b border-border p-2.5">
        <Button variant={"ghost"} onClick={() => route.back()}>
          <ChevronLeft />
        </Button>
      </div>
    </div>
  )
}
