"use client"

import { LIST_TOKEN } from "@/data/data-list-token"
import { SectionHeader } from "./sections/section-header"
import { Landmark, SearchX } from "lucide-react"
import { SectionMain } from "./sections/section-main"
import { SectionChart } from "./sections/section-chart"
import { SectionAbout } from "./sections/section-about"
import { Button } from "@/components/ui/button"
import { ButtonNav } from "@/components/custom/button/button-navigation"
import { StatisticalSection } from "./sections/section-statistical"
type Props = {
  symbol: string
}
export const TokenInfor: React.FC<Props> = ({ symbol }) => {
  const data = LIST_TOKEN.find((t) => t.symbol === symbol)
  if (!data)
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-t border-red-500/40 bg-white text-red-500 shadow-lg shadow-red-500/10">
          <SearchX strokeWidth={3} size={24} />
        </div>
        <p className="text-xl font-bold"> Token không tồn tại</p>
        <a href="/user/home">Về trang chủ</a>
      </div>
    )
  return (
    <div className="w-full pb-20">
      <SectionHeader />
      <SectionMain data={data} />
      <SectionChart />
      <SectionAbout data={data} />
      <StatisticalSection />
      <div className="fixed bottom-0 z-100 w-full pb-5">
        <div className="flex w-full items-center justify-center px-2.5">
          <ButtonNav classname="w-full flex-1  ">
            <div className="flex items-center justify-center gap-1 font-bold text-blue-700">
              <Landmark /> <p>Mua</p>
            </div>
          </ButtonNav>
        </div>
      </div>
    </div>
  )
}
