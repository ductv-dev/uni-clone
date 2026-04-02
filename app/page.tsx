"use client"
import { CandlestickChart } from "@/components/charts/charts-candle"
import { TriggerButton } from "@/components/custom/button/trigger-button"
import { CardNotification } from "@/components/custom/cards/card-notification"
import { CardToken1 } from "@/components/custom/cards/card-token-1"
import { CardToken2 } from "@/components/custom/cards/card-token-2"
import { DrawerSetting } from "@/components/custom/drawer/drawer-setting"
import { Navbar } from "@/components/custom/nav-bar"
import { Icons } from "@/components/ui/icons"
import { generateOHLC } from "@/lib/utils"
import { CandlestickData, Time } from "lightweight-charts"
import { TicketSlash } from "lucide-react"

const data_tokens = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      image: "/images/bitcoin.png",
      number_changes: 5.2,
      price: 40000,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      image: "/images/eth.png",
      number_changes: -2.1,
      price: 3000,
    },
  ],
  data_notifications = [
    {
      title: "Thông báo 1",
      description:
        "Đây là mô tả của thông báo 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: <TicketSlash strokeWidth={1} />,
      isRequired: true,
    },
    {
      title: "Thông báo 2",
      description: "Đây là mô tả của thông báo 2",
      icon: <TicketSlash strokeWidth={1} />,
      isRequired: false,
    },
  ],
  data_buttons: { icon: keyof typeof Icons; title: string }[] = [
    {
      icon: "globe",
      title: "Button 1",
    },
    {
      icon: "home",
      title: "Button 2",
    },
    {
      icon: "heart",
      title: "Button 3",
    },
  ]
export default function Page() {
  const data = generateOHLC() as CandlestickData<Time>[]
  return (
    <div className="pb-50">
      <div className="flex flex-col gap-2.5 p-2.5">
        {data_tokens.map((item, index) => (
          <CardToken1 key={index} rank={index + 1} {...item} />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 p-2.5">
        {data_notifications.map((item, index) => (
          <CardNotification key={index} {...item} />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 p-2.5">
        {data_tokens.map((item, index) => (
          <CardToken2 key={index} {...item} />
        ))}
      </div>

      <div className="flex flex-col gap-2.5 p-2.5">
        {data_buttons.map((item, index) => (
          <TriggerButton key={index} {...item} />
        ))}
      </div>
      <DrawerSetting />
      <div
        style={{
          padding: "20px",
        }}
      >
        <h1 style={{ color: "white", fontFamily: "sans-serif" }}>
          ETH/USDT Chart
        </h1>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <CandlestickChart data={data} />
        </div>
      </div>
      <Navbar />
    </div>
  )
}
