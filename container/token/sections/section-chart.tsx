import { CandlestickChart } from "@/components/charts/charts-candle"
import { Badge } from "@/components/ui/badge"
import { generateOHLC, Timeframe } from "@/lib/utils"
import { CandlestickData, Time } from "lightweight-charts"
import { useTheme } from "next-themes"
import { useMemo, useState } from "react"

const TIMEFRAMES: { label: string; value: Timeframe }[] = [
  { label: "Giờ", value: "1H" },
  { label: "Ngày", value: "1D" },
  { label: "Tuần", value: "1W" },
  { label: "Tháng", value: "1M" },
  { label: "Năm", value: "1Y" },
]

export const SectionChart = () => {
  const { resolvedTheme, theme, setTheme } = useTheme()

  const colors = {
    backgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#fff",
    textColor: resolvedTheme === "dark" ? "#d1d4dc" : "#1f2937",
    upColor: "#26a69a",
    downColor: "#ef5350",
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
    vertLines: resolvedTheme === "dark" ? "#374151" : "#e0e1f9",
    horzLines: resolvedTheme === "dark" ? "#374151" : "#e0e1f9",

  }
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("1D")
  const data = useMemo(() => {
    return generateOHLC(500, 120, activeTimeframe) as CandlestickData<Time>[]
  }, [activeTimeframe])
  return (
    <div className="flex flex-col gap-2.5">
      <div
        style={{
          overflow: "hidden",
          maxWidth: "800px",
        }}
      >
        <CandlestickChart data={data} colors={colors} />
      </div>
      <div className="no-scrollbar flex w-full items-center gap-2.5 scroll-auto px-2.5">
        Xem theo:
        {TIMEFRAMES.map((t) => (
          <Badge
            onClick={() => setActiveTimeframe(t.value)}
            className={
              t.value === activeTimeframe
                ? "bg-primary text-background"
                : "bg-background text-primary"
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
