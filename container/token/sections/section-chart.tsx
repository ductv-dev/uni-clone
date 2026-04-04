import { Badge } from "@/components/ui/badge"
import { div } from "framer-motion/client"
import { useState } from "react"

const LIST_TIME = [
  { name: "Ngày", value: "day" },
  { name: "Tuần", value: "week" },
  { name: "Tháng", value: "month" },
  { name: "Năm", value: "year" },
]
export const SectionChart = () => {
  const [time, setTime] = useState("day")
  return (
    <div className="flex flex-col gap-2.5">
      <div className="h-100 w-full bg-black">
        <p className="text-white">Chart</p>
      </div>
      <div className="no-scrollbar flex w-full items-center gap-2.5 scroll-auto px-2.5">
        Xem theo:
        {LIST_TIME.map((t) => (
          <Badge
            onClick={() => setTime(t.value)}
            className={t.value === time ? "bg-blue-700 text-white" : ""}
            key={t.value}
          >
            {t.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
