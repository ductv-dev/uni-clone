import {
  ChartNoAxesCombined,
  ChartLine,
  ChartPie,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
const DATA_STATISTICAL = [
  {
    label: "Vốn hóa thị trường",
    icon: <ChartNoAxesCombined />,
    value: 8.2,
  },
  {
    label: "Định giá pha loãng hoàn toàn",
    icon: <ChartLine />,
    value: 9.1,
  },
  {
    label: "Khối lượng trong vòng 24h",
    icon: <ChartPie />,
    value: 0.54,
  },
  {
    label: "Giá cao nhất trong 52 tuần",
    icon: <TrendingUp />,
    value: 10000.44,
  },
  {
    label: "Giá thấp nhất trong vòng 52 tuần",
    icon: <TrendingDown />,
    value: 20000.44,
  },
]

export const StatisticalSection = () => {
  return (
    <div className="px-2.5">
      <p className="text-lg font-bold text-foreground/60">Thống kê</p>
      <div className="flex flex-col gap-1">
        {DATA_STATISTICAL.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5 text-foreground/60">
            <div className="flex flex-1 items-center gap-1">
              <div>{item.icon}</div>
              <p className="">{item.label}</p>
            </div>

            <p className="">{item.value} US$</p>
          </div>
        ))}
      </div>
    </div>
  )
}
