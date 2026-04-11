import {
  CandlestickChart,
  RealtimeUpdate,
} from "@/components/charts/charts-candle"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Timeframe } from "@/lib/utils"
import { TTypeChart } from "@/types"
import { CandlestickData, HistogramData, Time } from "lightweight-charts"
import { ChartCandlestick, ChartLine, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { useMemo, useState } from "react"

const TIMEFRAMES: { label: string; value: Timeframe }[] = [
  { label: "Giây", value: "1S" },
  { label: "Giờ", value: "1H" },
  { label: "Ngày", value: "1D" },
  { label: "Tuần", value: "1W" },
  { label: "Tháng", value: "1M" },
  { label: "Năm", value: "1Y" },
]

const TYPE_CHART: TTypeChart[] = [
  { label: "Candle", value: "candle", icon: <ChartCandlestick /> },
  { label: "Line", value: "line", icon: <ChartLine /> },
]

type Props = {
  historicalData: CandlestickData<Time>[]
  volumeData: HistogramData<Time>[]
  realtimeUpdate?: RealtimeUpdate
  activeTimeframe: Timeframe
  onTimeframeChange: (timeframe: Timeframe) => void
  isLoading: boolean
  error: Error | null
}

export const SectionChart: React.FC<Props> = ({
  historicalData,
  volumeData,
  realtimeUpdate,
  activeTimeframe,
  onTimeframeChange,
  isLoading,
  error,
}) => {
  const { resolvedTheme } = useTheme()
  const [typeChart, setTypeChart] = useState<TTypeChart>(TYPE_CHART[0])

  const colors = useMemo(
    () => ({
      backgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#fff",
      textColor: resolvedTheme === "dark" ? "#d1d4dc" : "#1f2937",
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      vertLines: resolvedTheme === "dark" ? "#374151" : "#e0e1f9",
      horzLines: resolvedTheme === "dark" ? "#374151" : "#e0e1f9",
    }),
    [resolvedTheme]
  )

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <Select
          disabled={isLoading}
          value={activeTimeframe}
          onValueChange={(value) => onTimeframeChange(value as Timeframe)}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Chọn khung thời gian" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {TIMEFRAMES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={typeChart.value}
          onValueChange={(value) =>
            setTypeChart(
              TYPE_CHART.find((t) => t.value === value) || TYPE_CHART[0]
            )
          }
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Chọn loại biểu đồ" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {TYPE_CHART.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  <div className="flex items-center gap-1">
                    <div>{option.icon}</div>
                    <p>{option.label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        style={{
          overflow: "hidden",
          maxWidth: "800px",
        }}
      >
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="size-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          <CandlestickChart
            type={typeChart}
            volumeData={volumeData}
            data={historicalData}
            realtimeUpdate={realtimeUpdate}
            colors={colors}
          />
        )}
      </div>
    </div>
  )
}
