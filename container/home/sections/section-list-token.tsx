"use client"

import { CardToken1 } from "@/components/custom/cards/card-token-1"
import { TToken } from "@/types/type-token"
import { useRouter } from "next/navigation"

type Props = {
  data: TToken[]
  isDesktop?: boolean
}
export const SectionListToken: React.FC<Props> = ({ data, isDesktop = false }) => {
  const route = useRouter()
  
  if (isDesktop) {
    const displayData = data.slice(0, 8)
    return (
      <div className="flex flex-col gap-2">
        <p className="px-1 text-xs font-semibold uppercase tracking-wider text-foreground/40">
          Thị trường
        </p>
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          {displayData.map((token, i) => (
            <div
              key={token.address}
              className={i < displayData.length - 1 ? "border-b border-border" : ""}
            >
              <CardToken1
                name={token.name}
                symbol={token.symbol}
                price={token.decimals}
                image={token.logoURI}
                number_changes={token.number_changes}
                onClick={() => route.push(`/token/${token.symbol}`)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 px-2.5">
      {data.map(
        (token, index) =>
          index < 5 && (
            <CardToken1
              key={token.address}
              name={token.name}
              symbol={token.symbol}
              price={token.decimals}
              image={token.logoURI}
              number_changes={token.number_changes}
              onClick={() => route.push(`/token/${token.symbol}`)}
            />
          )
      )}
    </div>
  )
}
