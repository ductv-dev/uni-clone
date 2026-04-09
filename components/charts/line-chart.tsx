""
import React, { useEffect, useRef } from "react"
import {
    ColorType,
    Time,
    createYieldCurveChart,
    LineSeries,
    LineData,
} from "lightweight-charts"


// 1. Định nghĩa Interface cho Props và Data
interface ChartProps {
    data: LineData<number>[]
    colors?: string
}

export const LineChartComponent: React.FC<ChartProps> = ({
    data,
    colors = "#2962FF",
}) => {
    const lineCharthartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!lineCharthartContainerRef.current) return

        // 2. Khởi tạo biểu đồ
        const chart = createYieldCurveChart(lineCharthartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#fff" },
                attributionLogo: false,
            },
            width: lineCharthartContainerRef.current.clientWidth,
            height: lineCharthartContainerRef.current.clientHeight,

        })

        // 3. Cấu hình định dạng chuỗi nến (Candlestick Series)
        const lineSeries = chart.addSeries(LineSeries, {
            color: '#2962FF'
        })

        // 4. Gắn dữ liệu vào biểu đồ
        lineSeries.setData(data)

        // 5. Xử lý sự kiện Resize để biểu đồ luôn responsive
        const handleResize = () => {
            if (lineCharthartContainerRef.current) {
                chart.applyOptions({ width: lineCharthartContainerRef.current.clientWidth })
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

    ])

    return (
        <div ref={lineCharthartContainerRef} style={{ width: "100%", height: "100%" }} />
    )
}
