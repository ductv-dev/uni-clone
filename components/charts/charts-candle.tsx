import { TTypeChart } from "@/types"
import {
  CandlestickData,
  CandlestickSeries,
  ColorType,
  createChart,
  HistogramData,
  HistogramSeries,
  ISeriesApi,
  LineSeries,
  Time,
} from "lightweight-charts"
import React, { useEffect, useRef } from "react"

export type RealtimeUpdate = {
  candle: CandlestickData<Time>
  volume: HistogramData<Time>
}

type ChartProps = {
  type: TTypeChart
  data: CandlestickData<Time>[]
  volumeData: HistogramData<Time>[]
  realtimeUpdate?: RealtimeUpdate
  colors?: {
    backgroundColor?: string
    textColor?: string
    upColor?: string
    downColor?: string
    wickUpColor?: string
    wickDownColor?: string
    vertLines?: string
    horzLines?: string
  }
}

export const CandlestickChart: React.FC<ChartProps> = ({
  type,
  data,
  volumeData,
  realtimeUpdate,
  colors: {
    backgroundColor = "#fff",
    textColor = "#d1d4dc",
    upColor = "#26a69a",
    downColor = "#ef5350",
    wickUpColor = "#26a69a",
    wickDownColor = "#ef5350",
    vertLines = "#e0e1f9",
    horzLines = "#e0e1f9",
  } = {},
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const seriesRef = useRef<
    ISeriesApi<"Candlestick"> | ISeriesApi<"Line"> | null
  >(null)
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null)

  // 1. Khởi tạo biểu đồ và vẽ data lịch sử
  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: { color: vertLines },
        horzLines: { color: horzLines },
      },
    })

    // Cấu hình định dạng chuỗi nến hoặc đường
    let mainSeries
    if (type.value === "candle") {
      mainSeries = chart.addSeries(CandlestickSeries, {
        upColor,
        downColor,
        borderVisible: false,
        wickUpColor,
        wickDownColor,
      })
      mainSeries.setData(data)
    } else {
      mainSeries = chart.addSeries(LineSeries, {
        color: "#100cf5",
        lineWidth: 2,
      })
      const lineData = data.map((d) => ({ time: d.time, value: d.close }))
      mainSeries.setData(lineData)
    }

    mainSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.4,
      },
    })
    seriesRef.current = mainSeries

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "",
    })
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8, // Volume chỉ chiếm 20% bên dưới
        bottom: 0,
      },
    })
    volumeSeries.setData(volumeData)
    volumeSeriesRef.current = volumeSeries

    // Xử lý sự kiện Resize để biểu đồ luôn responsive
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener("resize", handleResize)

    // Dọn dẹp khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
      seriesRef.current = null
      volumeSeriesRef.current = null
    }
  }, [
    type,
    data,
    volumeData,
    backgroundColor,
    textColor,
    upColor,
    downColor,
    wickUpColor,
    wickDownColor,
    vertLines,
    horzLines,
  ])

  // 2. React với realtime tick data từ Socket truyền vào thông qua props
  useEffect(() => {
    if (!realtimeUpdate) return

    if (seriesRef.current) {
      try {
        if (type.value === "candle") {
          const series = seriesRef.current as ISeriesApi<"Candlestick">
          series.update(realtimeUpdate.candle)
        } else {
          const series = seriesRef.current as ISeriesApi<"Line">
          series.update({
            time: realtimeUpdate.candle.time,
            value: realtimeUpdate.candle.close,
          })
        }
      } catch (err) {
        console.warn("Chart update skipped:", err)
      }
    }

    if (volumeSeriesRef.current) {
      try {
        volumeSeriesRef.current.update(realtimeUpdate.volume)
      } catch (err) {
        console.warn("Volume update skipped:", err)
      }
    }
  }, [realtimeUpdate, type])

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
  )
}
