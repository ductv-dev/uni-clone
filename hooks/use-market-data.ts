import {
  generateNextCandle,
  generateOHLC,
  generateVolumeData,
  Timeframe,
} from "@/lib/utils"
import { CandlestickData, HistogramData, Time } from "lightweight-charts"
import { useEffect, useState } from "react"

export function useMarketData(initialPrice: number) {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("1D")
  const [historicalData, setHistoricalData] = useState<CandlestickData<Time>[]>(
    []
  )
  const [volumeData, setVolumeData] = useState<HistogramData<Time>[]>([])

  const [realtimeCandle, setRealtimeCandle] =
    useState<CandlestickData<Time> | null>(null)
  const [realtimeVolume, setRealtimeVolume] =
    useState<HistogramData<Time> | null>(null)

  const [currentPrice, setCurrentPrice] = useState(initialPrice)
  const [priceChange, setPriceChange] = useState(0)
  const [percentageChange, setPercentageChange] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // 1. Tạo data khi thay đổi khung thời gian
  useEffect(() => {
    //tạo ignore để tránh race condition
    let ignore = false

    // Tạo hàm async để giả lập việc gọi API
    const fetchHistoricalData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Giả lập network delay
        await new Promise((resolve) => setTimeout(resolve, 3000))
        if (ignore) return // Hủy việc set state nếu component unmount hoặc effect bị gọi lại

        const freshData = generateOHLC(
          500,
          initialPrice,
          activeTimeframe
        ) as CandlestickData<Time>[]
        const freshVolume = generateVolumeData(
          freshData
        ) as HistogramData<Time>[]

        setHistoricalData(freshData)
        setVolumeData(freshVolume)

        // Reset realtime tick state for the new timeframe
        setRealtimeCandle(null)
        setRealtimeVolume(null)

        if (freshData.length > 0) {
          const lastItem = freshData[freshData.length - 1]
          const prevItem =
            freshData.length > 1 ? freshData[freshData.length - 2] : lastItem

          setCurrentPrice(lastItem.close)
          const change = lastItem.close - prevItem.close
          setPriceChange(change)
          setPercentageChange(
            prevItem.close === 0 ? 0 : (change / prevItem.close) * 100
          )
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to fetch market data")
          )
        }
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchHistoricalData()
    return () => {
      ignore = true
    }
  }, [activeTimeframe, initialPrice])

  // 2. giả lập WebSocket cho realtime data khi chọn timeframe
  useEffect(() => {
    let intervalId: number | undefined

    if (activeTimeframe === "1S" && historicalData.length > 0) {
      let lastCandle = historicalData[historicalData.length - 1]

      intervalId = window.setInterval(() => {
        const prevCandlePrice = lastCandle.close
        const nextCandle = generateNextCandle(lastCandle)

        lastCandle = nextCandle

        const volumePoint: HistogramData<Time> = {
          time: nextCandle.time,
          value: Math.abs(nextCandle.high - nextCandle.low),
          color: nextCandle.close >= nextCandle.open ? "#92d3cc" : "#f6a8a7",
        }

        setRealtimeCandle(nextCandle)
        setRealtimeVolume(volumePoint)

        setCurrentPrice(nextCandle.close)
        const change = nextCandle.close - prevCandlePrice
        setPriceChange(change)
        setPercentageChange(
          prevCandlePrice === 0 ? 0 : (change / prevCandlePrice) * 100
        )
      }, 1000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [activeTimeframe, historicalData])

  return {
    activeTimeframe,
    setActiveTimeframe,
    historicalData,
    volumeData,
    realtimeUpdate:
      realtimeCandle && realtimeVolume
        ? { candle: realtimeCandle, volume: realtimeVolume }
        : undefined,
    currentPrice,
    priceChange,
    percentageChange,
    isLoading,
    error,
  }
}
