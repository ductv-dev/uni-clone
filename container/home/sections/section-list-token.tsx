"use client"

import { CardToken1 } from "@/components/custom/cards/card-token-1"
import { TToken } from "@/types/type-token"
import { useRouter } from "next/navigation"

type Props = {
  data: TToken[]
}
export const SectionListToken: React.FC<Props> = ({ data }) => {
  const route = useRouter()
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
