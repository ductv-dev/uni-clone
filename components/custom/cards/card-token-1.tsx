import { MiniChart } from "@/components/charts/chart-widget"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useBinanceTicker } from "@/hooks/use-market-data"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

type TcardToken1Props = {
  rank?: number
  name: string
  symbol?: string
  description?: string
  image: string
  number_changes?: number
  price?: number
  onClick?: () => void
  className?: string
}

export const CardToken1: React.FC<TcardToken1Props> = ({
  rank,
  name,
  symbol,
  description,
  image,
  number_changes = 0,
  price,
  onClick,
  className,
}) => {
  const symbolUsdt = symbol ? `${symbol}USDT` : ""
  const { currentPrice, data24h, percentageChange } =
    useBinanceTicker(symbolUsdt)
  return (
    <div
      onClick={onClick}
      className={
        cn(className) +
        " flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-4 py-2 hover:bg-accent"
      }
    >
      <div className="flex flex-1 items-center gap-2.5">
        {rank && <span className="font-medium text-foreground/60">{rank}</span>}

        <Avatar className="h-12 w-12">
          <AvatarImage src={image} alt="token image" className="" />
          <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          {symbol && (
            <span className="text-xs text-foreground/60">{symbol}</span>
          )}
        </div>
      </div>
      <div>
        <MiniChart data={data24h} width={50} height={12} strokeWidth={2} />
      </div>
      <div className="flex flex-col items-end">
        {(currentPrice > 0 ? currentPrice : price) !== undefined && (
          <span className="text-sm font-medium">
            {(currentPrice > 0 ? currentPrice : price || 0).toLocaleString(
              undefined,
              { minimumFractionDigits: 2 }
            )}{" "}
            US$
          </span>
        )}
        {description && (
          <span className="text-xs text-foreground/60">{description}</span>
        )}
        <div className="flex items-center">
          {(percentageChange !== 0 ? percentageChange : number_changes) > 0 ? (
            <div className="flex">
              <ChevronUp className="h-4 w-4 text-green-500" />
              <span className="text-xs font-medium text-green-500">
                {percentageChange !== 0 ? percentageChange : number_changes}%
              </span>
            </div>
          ) : (percentageChange !== 0 ? percentageChange : number_changes) <
            0 ? (
            <div className="flex">
              <ChevronDown className="h-4 w-4 text-red-500" />
              <span className="text-xs font-medium text-red-500">
                {Math.abs(
                  percentageChange !== 0 ? percentageChange : number_changes
                )}
                %
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-foreground/60">0%</span>
          )}
        </div>
      </div>
    </div>
  )
}
