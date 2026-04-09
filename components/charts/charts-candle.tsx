""
import React, { useEffect, useRef } from "react"
import {
  createChart,
  ColorType,
  CandlestickData,
  Time,
  CandlestickSeries,
} from "lightweight-charts"

// 1. Định nghĩa Interface cho Props và Data
interface ChartProps {
  data: CandlestickData<Time>[]
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
  data,
  colors: {
    backgroundColor = "#fff", // Màu nền tối (thường thấy ở DEX)
    textColor = "#d1d4dc",
    upColor = "#26a69a", // Nến xanh
    downColor = "#ef5350", // Nến đỏ
    wickUpColor = "#26a69a",
    wickDownColor = "#ef5350",
    vertLines = "#e0e1f9",
    horzLines = "#e0e1f9",

  } = {},
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // 2. Khởi tạo biểu đồ
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

    // 3. Cấu hình định dạng chuỗi nến (Candlestick Series)
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor,
      downColor,
      borderVisible: false,
      wickUpColor,
      wickDownColor,
    })

    // 4. Gắn dữ liệu vào biểu đồ
    candlestickSeries.setData(data)

    // 5. Xử lý sự kiện Resize để biểu đồ luôn responsive
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener("resize", handleResize)

    // 6. Dọn dẹp  khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [
    data,
    backgroundColor,
    textColor,
    upColor,
    downColor,
    wickUpColor,
    wickDownColor,
    vertLines,
    horzLines,
  ])

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
  )
}
