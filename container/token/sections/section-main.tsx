"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TToken } from "@/types/type-token"
import { ChevronDown, ChevronUp } from "lucide-react"

type Props = {
  data: TToken
}
export const SectionMain: React.FC<Props> = ({ data }) => {
  const [randomChange, setRandomChange] = useState<number>(
    data.number_changes ?? 0
  )

  useEffect(() => {
    const updateRandomChange = () => {
      setRandomChange(parseFloat((Math.random() * 0.1 - 0.05).toFixed(2)))
    }

    const intervalId = window.setInterval(updateRandomChange, 5000)
    updateRandomChange()

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="mt-20 flex flex-col gap-2.5 p-2.5">
      <div className="flex gap-2.5">
        <Avatar className="h-12 w-12">
          <AvatarImage src={data.logoURI} alt="token image" className="" />
          <AvatarFallback>{data.symbol.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-semibold text-foreground/60">{data.name}</p>
          <p className="text-sm text-foreground/60">{data.symbol}</p>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground/60">
          {(data.usdt * (1 + randomChange)).toFixed(2)} US$
        </p>
        <div className="flex gap-2.5">
          <div className="flex">
            {randomChange > 0 ? (
              <ChevronUp className="text-green-500" />
            ) : (
              <ChevronDown className="text-red-500" />
            )}
            <p className="text-foreground/60">
              {(randomChange * data.usdt).toFixed(2)}
            </p>
          </div>
          <p className="text-foreground/60">({randomChange}%)</p>
        </div>
      </div>
    </div>
  )
}
