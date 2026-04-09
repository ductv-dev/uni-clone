"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TToken } from "@/types/type-token"
import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react"
import { FavoriteStar } from "@/components/ui/favotite-heart"

type Props = {
  data: TToken
}
export const SectionMain: React.FC<Props> = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [randomChange, setRandomChange] = useState<number>(
    data.number_changes ?? 0
  )

  useEffect(() => {
    const updateRandomChange = () => {
      setRandomChange(parseFloat((Math.random() * 0.1 - 0.05).toFixed(2)))
    }

    const intervalId = window.setInterval(updateRandomChange, 1000)
    updateRandomChange()

    return () => window.clearInterval(intervalId)
  }, [])

  const price = data.usdt * (1 + randomChange)
  const priceChange = data.usdt * randomChange
  const percentageChange = randomChange * 100



  return (
    <div className="flex gap-2.5 ">
      <div className="flex-1">
        <div className=" flex mt-16 md:mt-0 flex-col gap-2.5 p-2.5">

          <div className="flex gap-2.5">
            <Avatar className="h-12 w-12">
              <AvatarImage src={data.logoURI} alt="token image" className="" />
              <AvatarFallback>{data.symbol.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-foreground/60">
                  {data.name}
                </p>
                <Badge className="h-6 bg-primary/15 px-2.5 text-primary">
                  <ShieldCheck className="size-3.5" />
                  Verified
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
                <p>{data.symbol}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-foreground/80">
                {price.toFixed(2)} US$
              </p>
              <div className="mt-1 flex gap-2.5">
                <div className="flex">
                  {randomChange > 0 ? (
                    <ChevronUp className="text-green-500" />
                  ) : (
                    <ChevronDown className="text-red-500" />
                  )}
                  <p className="text-foreground/60">{priceChange.toFixed(2)} US$</p>
                </div>
                <p className="text-foreground/60">
                  ({percentageChange.toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FavoriteStar isFavorite={isFavorite} onClick={() => setIsFavorite(!isFavorite)} />    </div>
  )
}
