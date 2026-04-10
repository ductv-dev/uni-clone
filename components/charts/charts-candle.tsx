""
import { TTypeChart } from "@/types"
import {
  CandlestickData,
  CandlestickSeries,
  ColorType,
  createChart,
  HistogramData,
  HistogramSeries,
  LineSeries,
  Time,
} from "lightweight-charts"
import React, { useEffect, useRef } from "react"

type ChartProps = {
  type: TTypeChart
  data: CandlestickData<Time>[]
  volumeData: HistogramData<Time>[]
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

  useEffect(() => {
    if (!chartContainerRef.current) return

    //  Khởi tạo biểu đồ
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

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "", // Đặt trống để biến nó thành overlay
    })
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8, // Volume chỉ chiếm 20% bên dưới
        bottom: 0,
      },
    })

    // Gắn dữ liệu vào biểu đồ volume
    volumeSeries.setData(volumeData)

    // Xử lý sự kiện Resize để biểu đồ luôn responsive
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener("resize", handleResize)

    // Dọn dẹp  khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
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

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
  )
}
