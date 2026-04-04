import { CandlestickChart } from "@/components/charts/charts-candle"
import { Badge } from "@/components/ui/badge"
import { generateOHLC, Timeframe } from "@/lib/utils"
import { div } from "framer-motion/client"
import { CandlestickData, Time } from "lightweight-charts"
import { useMemo, useState } from "react"

const TIMEFRAMES: { label: string; value: Timeframe }[] = [
  { label: "Giờ", value: "1H" },
  { label: "Ngày", value: "1D" },
  { label: "Tuần", value: "1W" },
  { label: "Tháng", value: "1M" },
  { label: "Năm", value: "1Y" },
]

export const SectionChart = () => {
  const [time, setTime] = useState("day")
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("1D")
  const data = useMemo(() => {
    return generateOHLC(150, 120, activeTimeframe) as CandlestickData<Time>[]
  }, [activeTimeframe])
  return (
    <div className="flex flex-col gap-2.5">
      <div
        style={{
          border: "1px solid #1f2937",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <CandlestickChart data={data} />
      </div>
      <div className="no-scrollbar flex w-full items-center gap-2.5 scroll-auto px-2.5">
        Xem theo:
        {TIMEFRAMES.map((t) => (
          <Badge
            onClick={() => setActiveTimeframe(t.value)}
            className={
              t.value === activeTimeframe ? "bg-blue-700 text-white" : ""
            }
            key={t.value}
          >
            {t.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}
